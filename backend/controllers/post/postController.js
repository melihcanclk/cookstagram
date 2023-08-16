import { Post } from "../../db/postModel.js";
import User from "../../db/userModel.js";
import mongoose from "mongoose";
import { postPayload } from "./postPayloads.js";
import { userPayload } from "../user/userPayloads.js";
import { sortByDate } from "../../utils/sort.js";

export const createPost = async (req, res) => {

    const data = req.body;
    const picture = req.file;
    
    let post;
    let user;
    try {
        user = await User.findOne({ username: data.username });

        if (!user) {
            throw new Error("User not found");
        }

        const recipeData = {
            ...data,
            picture: picture ? picture.filename : null,
            user: user._id
        }

        post = new Post(recipeData)

        const session = await mongoose.startSession();
        session.startTransaction();
        const postRes = await post.save();
        const authorRes = await User.findOne({ username: user.username });
        authorRes.posts.push(postRes._id);
        await authorRes.save();
        await session.commitTransaction();
        session.endSession();

    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: e.message,
        });
    }

    return res.status(201).send({
        message: "Post created successfully",
        post: postPayload(post),
    });
};

export const getSinglePost = async (req, res) => {
    const { id } = req.params;
    let post;
    try {
        post = await Post.findOne(
            { _id: id },
        ).populate("user");
    } catch (e) {
        return res.status(500).send({
            message: e.message,
        });
    }

    // get user with id
    if (!post) {
        return res.status(404).send({
            message: "Post not found",
        });
    }

    return res.status(200).send({
        message: "Post was fetched successfully",
        post: postPayload(post),
    });

}

export const getAllPosts = async (req, res) => {
    let posts;
    try {
        posts = await Post.find().populate("user");
    } catch (e) {
        return res.status(500).send({
            message: e.message,
        });
    }

    const postsPayload = posts.map((post) => {
        return {
            post: postPayload(post),
        };
    });

    return res.status(200).send({
        message: "Posts were fetched successfully",
        posts: postsPayload,
    });
}

export const getPostsByUser = async (req, res) => {
    const { username } = req.params;
    let posts;
    let user;
    try {
        // get user id with username
        user = await User.findOne({ username: username }).populate("posts");
        if (!user) {
            throw new Error("User not found")
        }

        posts = user.posts;

        posts.sort(sortByDate);

    } catch (e) {
        return res.status(500).send({
            message: e.message,
        });
    }

    const postsPayload = posts.map((post) => {
        return {
            ...postPayload(post),
        };
    });

    return res.status(200).send({
        message: "Posts were fetched successfully",
        posts: postsPayload,
    });
}


export const getPostByUser = async (req, res) => {
    const { id } = req.params;
    let post;
    try {
        post = await Post.findOne(
            { _id: id },
        ).populate("user");
    } catch (e) {
        return res.status(500).send({
            message: e.message,
        });
    }

    if (!post) {
        return res.status(404).send({
            message: "Post not found",
        });
    }
    return res.status(200).send({
        message: "Post was fetched successfully",
        post: postPayload(post),
    });

}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    let post;
    try {
        post = await Post.findByIdAndRemove({
            _id: id,
        }).populate("user");
        if (!post) {
            throw new Error("Post not found");
        }

        const authorRes = await User.findOne({ _id: post.user });
        authorRes.posts.pull(id);
        await authorRes.save();

    } catch (e) {
        return res.status(500).send({
            message: e.message,
        });
    }

    return res.status(200).send({
        message: "Post was deleted successfully",
        post: postPayload(post),
    });

}
