import { dbConnect } from './dbConnect.js';
import express from 'express';
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import User from "./db/userModel.js"

const app = express();

app.use(express.json());

dbConnect();

// register endpoint
app.post("/register", (request, response) => {
    const password = request.body.password;
    // hash the password
    bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
            const user = new User({
                email: request.body.email,
                username: request.body.username,
                password: hashedPassword,
            });

            user
                .save()
                .then((result) => {
                    response.status(201).send({
                        message: "User Created Successfully",
                        result,
                    });
                })
                .catch((error) => {
                    response.status(500).send({
                        message: "Error creating user",
                        error,
                    });
                });
        })
        .catch((e) => {
            response.status(500).send({
                message: "Password was not hashed successfully",
                e,
            });
        });
});

app.post("/login", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

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
                                "RANDOM-TOKEN-SECRET",
                                { expiresIn: "24h" }
                            );
                            response.status(200).send({
                                message: "Authentication Successful",
                                token,
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
                    message: "Authentication Failed, user not found",
                });
            }
        })
        .catch((e) => {
            response.status(500).send({
                message: "Authentication Failed",
                e,
            });
        });
});





app.listen("3000", () => {
    console.log("Listening on port 3000");
})