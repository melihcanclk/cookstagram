import mongoose from "mongoose";    

let UserSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: [true, "Please provide password"],
        unique: false
    }
});


export default UserSchema = (mongoose.model.Users || mongoose.model("Users", UserSchema))