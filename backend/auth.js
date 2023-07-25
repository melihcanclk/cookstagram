import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const auth = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        request.user = decoded;
        // next is a function that allows the request to continue to the next middleware
        next();

    } catch (error) {
        response.status(401).json({
            message: "Auth failed",
        });
    }
};

export default auth;