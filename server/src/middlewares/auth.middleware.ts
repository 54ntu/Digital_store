import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config.js";
import User from "../models/user.model.js";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log(`token from cookies : ${token}`)
        if (!token) {
            return res.status(401).json({
                message: "access denied, unauthorized user!!!!!  "
            })
        }

        console.log("token : ", token)

        const decodedToken = jwt.verify(token, envConfig.accessTokenSecret as string);

        // console.log("decodedToken : ", decodedToken)

        if (!decodedToken) {
            return res.status(401).json({
                message: "invalid token!!!!!"
            })
        }
        //attach the user info to the req object
        const { id } = decodedToken as { id: number };
        // console.log("decoded user id : ", id)
        const user = await User.findByPk(id);

        // console.log("user from verifyToken middleware : ", user?.username)

        if (!user) {
            return res.status(404).json({
                message: "user not found!!!!!!"
            })
        }

        req.user = user; //attach user info to req object

        next();

    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            error: error
        })

    }
}

export default verifyToken;