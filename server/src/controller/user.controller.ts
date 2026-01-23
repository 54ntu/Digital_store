import type { Request, Response } from "express";
import User from "../models/user.model.js";
import EncryptDecryptPassHandler from "../handler/authController.js";

class UserController {
    static async register(req: Request, res: Response) {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            res.status(400).json({
                message: "username, email and password are required!!!!"
            })
        }

        //check if user already exists or not

        const [data] = await User.findAll({
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

    }
}