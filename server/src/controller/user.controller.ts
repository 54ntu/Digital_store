import type { Request, Response } from "express";
import User from "../models/user.model.js";
import EncryptDecryptPassHandler from "../handler/authController.js";

class UserController {
    static async register(req: Request, res: Response) {
        try {

            const { username, email, password } = req.body
            if (!username || !email || !password) {
                return res.status(400).json({
                    message: "username, email and password are required!!!!"
                })
            }

            //check if user already exists or not

            const data = await User.findOne({
                where: {
                    email: email
                }
            })


            if (data) {
                return res.status(400).json({
                    message: "user with the given email already exists  !!!!    "
                })
            }

            const hashedPassword = await EncryptDecryptPassHandler.hashPassword(password)

            const user = await User.create({
                email,
                password: hashedPassword,
                username
            })


            if (user) {
                res.status(201).json({
                    message: "user registered successfully!!!!"
                })
            }

            return res.status(500).json({
                message: " something went wrong!!!! please try again later  "
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error",
                error: error
            })

        }

    }
}



export default UserController;