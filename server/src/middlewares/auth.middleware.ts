import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config.js";
import User from "../models/user.model.js";


interface JwtPayload {
    id: string;
    email: string;
    role: string;

}


interface IextededRequest extends Request {
    user?: JwtPayload;
}

const verifyToken = async (req: IextededRequest, res: Response, next: NextFunction): Promise<void> => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log(`token from cookies : ${token}`)
        if (!token) {
            res.status(401).json({
                message: "access denied, unauthorized user!!!!!  "
            })
            return;
        }

        // console.log("token : ", token)

        const decodedToken = jwt.verify(token, envConfig.accessTokenSecret as string) as JwtPayload;

        // console.log("decodedToken : ", decodedToken)

        if (!decodedToken) {
            res.status(401).json({
                message: "invalid token!!!!!"
            })
            return;
        }
        //attach the user info to the req object

        const userdata = await User.findByPk(decodedToken.id);

        // console.log("user from verifyToken middleware : ", user?.username)

        if (!userdata) {
            res.status(404).json({
                message: "user not found!!!!!!"
            })
            return;
        }

        req.user = {
            id: userdata.id,
            email: userdata.email,
            role: userdata.role
        }; //attach user info to req object

        next();

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error
        })
        return;

    }
}

export default verifyToken;