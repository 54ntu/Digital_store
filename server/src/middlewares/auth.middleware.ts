import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config.js";

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

        console.log("decodedToken : ", decodedToken)

        if (!decodedToken) {
            return res.status(401).json({
                message: "invalid token!!!!!"
            })
        }
        console.log("decodedToken : ", decodedToken)
    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            error: error
        })

    }
}

export default verifyToken;