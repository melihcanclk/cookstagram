import User from "../../db/userModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { userPayload } from "./userPayloads.js";
import { postPayload } from "../post/postPayloads.js";
import fs from "fs";
import { Post } from "../../db/postModel.js";
import { sortByDate } from "../../utils/sort.js";

export const registerUser = async (request, response) => {
    const { name, surname, username, email, password } = request.body;
    const picture = request.file;

    let hashedPassword;
    let user;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name: name,
            surname: surname,
            username: username,
            email: email,
            picture: picture ? picture.filename : null,
            password: hashedPassword,
            createdAt: Date.now(),
        });


        await user.save();
    }
    catch (e) {
        // delete the image if the user was not created
        if (request.file) {
            // delete the image
            fs.unlink(request.file.path, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }


        return response.status(500).send({
            message: e.message,
        });
    }

    return response.status(201).send({
        message: "User was created successfully",
        user: userPayload(user)
    });

};

export const loginUser = async (request, response) => {
    const { username, password } = request.body;

    let user;
    let hashedPassword;

    try {
        user = await User.findOne({ username: username })
        if (!user) {
            throw new Error("Authentication Failed - user not found")
        }

        hashedPassword = await bcrypt.compare(password, user.password);
        if (!hashedPassword) {
            throw new Error("Authentication Failed - password is incorrect")
        }
    } catch (e) {
        return response.status(500).send({
            message: e.message,
        });
    }

    const token = Jwt.sign(
        { username: user.username, userId: user._id },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
    );

    return response.status(200).send({
        message: "Authentication Successful",
        token,
        user: userPayload(user)
    });
};

export const getUser = async (request, response) => {
    const { username } = request.params;

    let user;
    try {
        user = await User.findOne({ username: username }).populate("posts");
        if (!user) {
            throw new Error("User not found")
        }

    } catch (e) {
        return response.status(500).send({
            message: e.message,
        });
    }

    return response.status(200).send({
        message: "User found",
        user: userPayload(user)
    });
};

// get posts of followed users
export const getFeed = async (request, response) => {
    const { username } = request.user;
    try {
        // get the user
        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error("User not found")
        }

        const userPosts = await Post.find({ user: user._id }).populate("user");
        const followingPosts = await Promise.all(
            user.following.map((followingUser) => {
                return Post.find({ user: followingUser._id }).populate("user");
            })
        );

        const posts = [
            ...userPosts,
            ...followingPosts.flat()
        ];

        posts.sort(sortByDate);

        const postPayloads = posts.map((post) => {
            const userPayloadWithoutPosts = {
                ...userPayload(post.user),
                posts: undefined,
            }
            return {
                ...postPayload(post),
                user: userPayloadWithoutPosts,
            };
        });


        return response.status(200).send({
            message: "Posts were fetched successfully",
            posts: postPayloads,
        });

    } catch (e) {
        return response.status(500).send({
            message: e.message,
        });
    }

};

export const updateUser = async (request, response) => {
    const { username } = request.params;

    let user;
    try {
        user = await User.findOne({ username: username });
        if (!user) {
            throw new Error("User not found")
        }

        for (const key in request.body) {
            if (request.body[key]) {
                user[key] = request.body[key];
            }
        }

        if (request.file) {
            user.picture = request.file.filename;
        }

        await user.save();

    } catch (e) {
        return response.status(500).send({
            message: e.message,
        });
    }

    return response.status(200).send({
        message: "User updated",
        user: userPayload(user)
    });
};
