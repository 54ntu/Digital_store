import type { Request, Response } from "express";
import User from "../models/user.model.js";
import EncryptDecryptPassHandler from "../handler/authController.js";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config.js";

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


    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "email or password is required!!!!!"
                })
            }

            //if email or username and password is given then check for user exist or not
            const [user] = await User.findAll({
                where: {

                    email: email

                }
            })

            // console.log("user : ", user)
            if (!user) {
                return res.status(404).json({
                    message: "user with the given email does not exist!!!!!!"
                })
            }

            const isPasswordMatched = await EncryptDecryptPassHandler.comparePassword(password, user.password);
            // console.log(isPasswordMatched)

            if (!isPasswordMatched) {
                return res.status(401).json({
                    message: "invalid credentials!!!!!"
                })

            }

            const accessToken = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },

                envConfig.accessTokenSecret as string,
                {
                    expiresIn: envConfig.accessTokenExpiry as string

                }
            )

            // console.log("accessToken : ", accessToken)

            //before we set token into the cookie we have to set some options
            const cookieOptions = {
                httpOnly: true,
                secure: true,
                sameSite: 'strict' as const
            }


            return res.status(200)
                .cookie('accessToken', accessToken, cookieOptions)
                .json({
                    message: "user logged in successfully!!!!!",
                    accessToken: accessToken
                })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error",
                error: error
            })

        }
    }


    static async logout(req: Request, res: Response) {
        try {
            const options = {
                httpOnly: true,
                secure: true,
                sameSite: 'strict' as const,
            }

            return res.status(200)
                .clearCookie('accessToken', options)
                .json({
                    message: "user logged out successfully!!!!!"
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