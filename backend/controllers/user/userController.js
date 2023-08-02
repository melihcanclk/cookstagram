import User from "../../db/userModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { userPayload } from "./userPayloads.js";


export const registerUser = async (request, response) => {
    const { username, email, password } = request.body;

    let hashedPassword;
    let user;
    try {
        hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            email: email,
            username: username,
            picture: request.file,
            password: hashedPassword,
            createdAt: Date.now(),
        });

        await user.save();
    }
    catch (e) {
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
