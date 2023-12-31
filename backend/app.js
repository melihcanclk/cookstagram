import { dbConnect } from './dbConnect.js';
import express from 'express';
import auth from "./auth.js";
import bodyParser from 'body-parser';
import { createPost, getPostByUser, getAllPosts, deletePost, getSinglePost, getPostsByUser } from './controllers/post/postController.js';
import multer from 'multer';
import dotenv from 'dotenv'
import { upload } from './middleware/upload.js';
import { loginUser, registerUser, getUser, getFeed, followUser, unfollowUser, searchUsers, getUserById } from './controllers/user/userController.js';
import { getImageByName } from './controllers/image/imageController.js';
import { updateUser } from './controllers/user/userController.js';

dotenv.config()

const app = express();
app.use(express.static('uploads'));

const bodyParserJson = bodyParser.json({ limit: '50mb' });
const bodyParserUrlencoded = bodyParser.urlencoded({ extended: true, limit: '50mb' });

app.use(bodyParserJson);
app.use(bodyParserUrlencoded);

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
app.get("/users/:id", auth, getUser);
app.put("/users/:id", auth, upload.single('picture'), updateUser);
app.post("/search/users", auth, searchUsers)

app.post("/create-post", auth, upload.single('picture'), createPost);
app.get("/feed", auth, getFeed);
app.post("/follow/:id", auth, followUser);
app.post("/unfollow/:id", auth, unfollowUser);
app.get("/posts", auth, getAllPosts);
app.get("/posts/user/:id", auth, getPostsByUser);
app.get("/posts/:id", auth, getSinglePost);
app.delete("/posts/:id", auth, deletePost);
app.get("/uploads/:imageName", getImageByName);

app.get("/auth-endpoint", auth, (request, response) => {
    response.status(200).send({
        message: "You are authorized",
    });
});

app.listen("3000", () => {
    console.log("Listening on port 3000");
})