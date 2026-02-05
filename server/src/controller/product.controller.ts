import type { Request, Response } from "express";
import { Product } from "../models/product.model.js";

class ProductController {
    // Controller methods will be implemented here

    static async createProduct(req: Request, res: Response): Promise<void> {

        // Implementation for creating a product
        const { productName, description, price, productStock, discount, categoryID } = req.body;

        if (!productName || !description || !price || !productStock || !categoryID) {
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
        const isProductExist= await Product.findAll({
            where:{
                productName,
                
            }
        })

    }

}



export default ProductController;