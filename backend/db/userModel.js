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
        unique: [true, "Username already exists"]
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
    }]
});


export default UserSchema = (mongoose.model.Users || mongoose.model("User", UserSchema))