import { dbConnect } from './dbConnect.js';
import express from 'express';
import bcrypt from "bcrypt";
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


app.listen("3000", () => {
    console.log("Listening on port 3000");
})