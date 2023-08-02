import { Post } from "../db/postModel.js";
import User from "../db/userModel.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
    const { title, content, author } = req.body;

    let post;
    try {
        post = new Post({
            title: title,
            content: content,
            createdAt: Date.now(),
            user: author,
        });

        const session = await mongoose.startSession();
        session.startTransaction();
        const postRes = await post.save();
        const authorRes = await User.findOne({ _id: author });
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
        message: "Post was created successfully",
        post: post,
    });
};

export const getPosts = async (req, res) => {
    const { id } = req.params;
    let posts;
    try {
        posts = await Post.find(
            { user: id },
        ).populate("user");
    } catch (e) {
        return res.status(500).send({
            message: e.message,
        });
    }

    const postsPayload = posts.map((post) => {
        return {
            id: post._id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            user: {
                id: post.user._id,
            },
        };
    });

    return res.status(200).send({
        message: "Posts were fetched successfully",
        posts: postsPayload,
    });
}