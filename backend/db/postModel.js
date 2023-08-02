import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        unique: false
    },
    content: {
        type: String,
        required: [true, "Please provide content"],
        unique: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});


export const Post = (mongoose.model.Post || mongoose.model("Post", PostSchema))