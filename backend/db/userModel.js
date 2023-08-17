import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        unique: false
    },
    surname: {
        type: String,
        required: [true, "Please provide a surname"],
        unique: false
    },
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "Username already exists"],
        minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: false
    },
    picture: {
        type: String,
        required: false,
        unique: false
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        unique: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: false,
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    }],

});


export default UserSchema = (mongoose.model("User", UserSchema))