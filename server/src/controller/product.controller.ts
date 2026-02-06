import type { Request, Response } from "express";
import { Product } from "../models/product.model.js";
import { emitWarning } from "node:process";

class ProductController {
    // Controller methods will be implemented here

    static async createProduct(req: Request, res: Response): Promise<void> {

        try {
            // Implementation for creating a product
            const { productName, description, price, productStock, discount, categoryId } = req.body;

            if (!productName || !description || !price || !productStock || !categoryId) {
                res.status(500).json({
                    message: "All fields are required😡😡😡😡😡😡😡"
                })
            }

            //image url will be handled separately  
            const productImageUrl = req.file?.filename;
            // console.log(productImageUrl)

            if (!productImageUrl) {
                res.send(500).json({
                    message: "image name is not received🤬🤬🤬🤬🤬🤬🤬🤬🤬"
                })
            }

            //check whether the same category and same product exist already or not
            const isProductExist = await Product.findOne({
                where: {
                    productName,
                    categoryId

                }
            })

            if (isProductExist) {
                isProductExist.productStock += Number(productStock)
                await isProductExist.save();

                res.status(200).json({
                    message: "product stock increamented successfully!!!",
                    product: isProductExist
                })
                return;
            }

            //if not new product is existed then we have to create new product

            const newProduct = await Product.create({

                productName,
                description,
                price,
                productStock,
                productImageUrl,
                discount,
                categoryId
            })

            res.status(201).json({
                message: "new product created successfully😊😊😊😊😊😊🤩🤩",
                product: newProduct
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal server error😒😒😒😒",
                error
            })

        }

    }

    static async getProduct(req: Request, res: Response): Promise<void> {
        try {
            const products = await Product.findAll();
            if (products.length === 0) {
                res.status(404).json({
                    message: "product not found😒😒😒😒😒😒"
                })
                return;
            }

            res.status(200).json({
                message: "product data fetched successfully😊😊😊😊😊😊",
                product: products
            })
            return;

        } catch (error) {
            res.status(500).json({
                message: "error while fetching product data🥲🥲🥲🥲🥲🥲🥲",
                error
            })

        }

    }

}



export default ProductController;