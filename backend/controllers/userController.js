import User from "../db/userModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

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
    const userPayload = {
        id: user._id,
        username: user.username,
        email: user.email,
        picture: {
            path: user.picture?.path,
        },
        createdAt: user.createdAt,
    }
    return response.status(201).send({
        message: "User was created successfully",
        user: userPayload,
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

    const payload = {
        username: user.username,
        email: user.email,
        picture: {
            path: user.picture?.path,
        },
        createdAt: user.createdAt,
    }

    return response.status(200).send({
        message: "Authentication Successful",
        token,
        user: payload
    });
};
