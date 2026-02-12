import type { Request, Response } from "express";
import Cart from "../models/cart.models.js";
import { Product } from "../models/product.model.js";

interface userRequest extends Request {
    user?: {
        id: string
    }
}

class CartController {
    static async addToCart(req: userRequest, res: Response): Promise<void> {
        //userid

        const userid = req.user?.id
        const { productId, quantity } = req.body
        if (!productId || !quantity) {
            res.status(400).json({
                message: "productid and qunatity details are required😡😡😡😡😡"
            })
            return;
        }

        const isProductExistInCart = await Cart.findOne({
            where: {
                productId,
                userID: userid
            }
        })

        if (isProductExistInCart) {
            isProductExistInCart.quantity += quantity
            await isProductExistInCart.save()
        } else {

            await Cart.create({
                userid,
                productId,
                quantity
            })

        }
        res.status(200).json({
            message: "product successfully added to the cart🤩🤩🤩🤩"
        })
        return


    }


    static async getCartItems(req: userRequest, res: Response): Promise<void> {
        const userId = req.user?.id

        const cartItems = await Cart.findAll({
            where: {
                userId
            },
            include: [
                {
                    model: Product,
                    attributes: ['id', 'productName', 'productPrice', 'productImageUrl']
                }
            ]
        })

        if (cartItems.length === 0) {
            res.status(404).json({
                message: "cart items data not found😒😒😒😒😒"
            })
            return;
        }

        res.status(200).json({
            message: "data fetched successfully🤩🤩🤩",
            data: cartItems
        })
    }

    static async deleteMyCartItem(req: userRequest, res: Request): Promise<void> {
        const userId = req.user?.id
        const { productId } = req.params
        //check if item exist or not 
        const productExist = await Product.findOne({
            where: {
                productId
            }
        })

       
    }
}