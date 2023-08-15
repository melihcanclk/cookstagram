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

export const followUser = async (request, response) => {
    const { username } = request.params;
    const { userId } = request.user;

    let user;
    let userToFollow;
    try {
        user = await User.findOne({ _id: userId });
        if (!user) {
            throw new Error("User not found")
        }

        // check if the user to follow exists
        userToFollow = await User.findOne({ username: username });
        if (!userToFollow) {
            throw new Error("User to follow not found")
        }
        console.log({ userToFollow })

        // check if the user is already following the user
        const isFollowing = user.following.find((followingUserId) => {
            return followingUserId.toString() === userToFollow._id.toString();
        })

        if (isFollowing) {
            throw new Error("User is already following the user")
        }

        // start mongoose session
        const session = await User.startSession();
        session.startTransaction();

        // add the user to follow to the user's following list
        user.following.push(userToFollow._id);
        await user.save({ session: session });

        // add the user to the user to follow's followers list
        userToFollow.followers.push(user._id);
        await userToFollow.save({ session: session });

        // commit the changes
        await session.commitTransaction();
        session.endSession();

    } catch (e) {
        return response.status(500).send({
            message: e.message,
        });
    }

    return response.status(200).send({
        message: "User followed",
        user: userPayload(userToFollow)
    });

};

export const unfollowUser = async (request, response) => {
    const { username } = request.params;
    const { userId } = request.user;

    let user;
    let userToUnfollow;

    try {
        user = await User.findOne({ _id: userId });
        if (!user) {
            throw new Error("User not found")
        }

        // check if the user to follow exists
        userToUnfollow = await User.findOne({ username: username });
        if (!userToUnfollow) {
            throw new Error("User to follow not found")
        }

        // check if the user is already following the user
        const isFollowing = user.following.find(async (followingUserId) => {
            const followingUser = await User.findOne({ _id: followingUserId });
            return followingUser.username === username;
        });


        if (!isFollowing) {
            throw new Error("User is not following the user")
        }

        // start mongoose session
        const session = await User.startSession();
        session.startTransaction();

        // remove the user to follow from the user's following list
        user.following.pull(userToUnfollow._id);
        await user.save({ session: session });

        // remove the user from the user to follow's followers list
        userToUnfollow.followers.pull(user._id);
        await userToUnfollow.save({ session: session });

        // commit the changes
        await session.commitTransaction();
        session.endSession();

    } catch (e) {
        return response.status(500).send({
            message: e.message,
        });
    }

    return response.status(200).send({
        message: "User unfollowed",
        user: userPayload(userToUnfollow)
    });

};

export const searchUsers = async (request, response) => {
    const { username } = request.body;
    let users;
    try {
        users = await User.find({
            $or: [
                { name: { $regex: username, $options: "i" } },
                { surname: { $regex: username, $options: "i" } },
                { username: { $regex: username, $options: "i" } },
            ],
        });

        if (!users) {
            // return empty array
            return response.status(200).send({
                message: "Users found",
                users: []
            });
        }

    } catch (e) {
        return response.status(500).send({
            message: e.message,
        });
    }

    const userPayloads = users.map((user) => {
        return userPayload(user);
    });

    return response.status(200).send({
        message: "Users found",
        users: userPayloads
    });
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
