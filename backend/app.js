import { dbConnect } from './dbConnect.js';
import express from 'express';
import auth from "./auth.js";
import { createPost, getPosts } from './controllers/postController.js';

import dotenv from 'dotenv'
import { upload } from './middleware/upload.js';
import { loginUser, registerUser } from './controllers/userController.js';
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
app.post("/register", upload.single('picture'), registerUser)
app.post("/login", loginUser);
app.post("/create-post", auth, createPost);
app.get("/posts", auth, getPosts);

app.get("/auth-endpoint", auth, (request, response) => {
    response.status(200).send({
        message: "You are authorized",
    });
});

app.listen("3000", () => {
    console.log("Listening on port 3000");
})