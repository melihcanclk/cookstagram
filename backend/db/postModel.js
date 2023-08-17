import mongoose from "mongoose";

const IngredientsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        unique: false
    },
    quantity: {
        type: Number,
        required: [true, "Please provide a quantity"],
        unique: false
    },
    unit: {
        type: String,
        required: [true, "Please provide a unit"],
        unique: false
    }
});


const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        unique: false
    },
    prepTimeInMins: {
        type: Number,
        required: [true, "Please provide a prep time"],
        unique: false
    },
    cookTimeInMins: {
        type: Number,
        required: [true, "Please provide a cook time"],
        unique: false
    },
    servings: {
        type: Number,
        required: [true, "Please provide a number of servings"],
        unique: false
    },
    ingredients: {  
        type: [IngredientsSchema],
        required: [true, "Please provide ingredients"],
        unique: false
    },
    directions: {
        type: String,
        required: [true, "Please provide directions"],
        unique: false
    },
    picture: {
        type: String,
        required: false,
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