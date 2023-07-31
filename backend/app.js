import { dbConnect } from './dbConnect.js';
import express from 'express';
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import User from "./db/userModel.js"
import auth from "./auth.js";

import dotenv from 'dotenv'
import { upload } from './middleware/upload.js';
dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this is for parsing multipart/form-data

dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// register endpoint
app.post("/register", upload.single('picture'), async (request, response) => {
    const { username, email, password } = request.body;
    // hash the password
    bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
            const user = new User({
                email: email,
                username: username,
                picture: request.file,
                password: hashedPassword
            });

            user
                .save()
                .then((result) => {
                    response.status(201).send({
                        message: "User Created Successfully",
                        user: {
                            username: result.username,
                            email: result.email,
                            picture: {
                                name: result.originalname,
                                path: result.picture.path
                            }
                        }
                    });
                })
                .catch((error) => {
                    if (error.errors.email) {
                        response.status(409).send({
                            message: error.errors.email.message,
                        });
                    } else if (error.errors.username) {
                        response.status(409).send({
                            message: error.errors.username.message,
                        });

                    } else {
                        response.status(500).send({
                            message: "User was not created successfully",
                            error,
                        });
                    }
                });
        })
        .catch((e) => {
            response.status(500).send({
                message: "Password was not hashed successfully",
                e,
            });
        });
});

app.post("/login", async (request, response) => {
    const { username, password } = request.body;

    User.findOne({ username: username })
        .then((user) => {
            if (user) {
                bcrypt
                    .compare(password, user.password)
                    .then((result) => {
                        if (!result) {
                            response.status(401).send({
                                message: "Authentication Failed, password is incorrect",
                            });
                        } else {
                            const token = Jwt.sign(
                                { username: user.username, userId: user._id },
                                process.env.JWT_KEY,
                                { expiresIn: "24h" }
                            );

                            const payload = {
                                username: user.username,
                                email: user.email,
                                picture: {
                                    path: user.picture.path,
                                }
                            }
                            response.status(200).send({
                                message: "Authentication Successful",
                                token,
                                user: payload
                            });
                        }
                    })
                    .catch((e) => {
                        response.status(500).send({
                            message: "Authentication Failed",
                            e,
                        });
                    });
            } else {
                response.status(401).send({
                    message: "Authentication Failed, user not found (401)",
                });
            }
        })
        .catch((e) => {
            response.status(500).send({
                message: "Authentication Failed, user not found (500)",
                e,
            });
        });
});


app.get("/auth-endpoint", auth, (request, response) => {
    response.status(200).send({
        message: "You are authorized",
    });
});

app.listen("3000", () => {
    console.log("Listening on port 3000");
})