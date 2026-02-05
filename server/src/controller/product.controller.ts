import type { Request, Response } from "express";

class ProductController {
    // Controller methods will be implemented here

    static async createProduct(req: Request, res: Response): Promise<void> {
        // Implementation for creating a product
        const { productName, description, price, productStock, discount, categoryID } = req.body;

        //image url will be handled separately
        const productImageUrl = req.file ?.filename;
        // console.log(req.file)
    }

}



export default ProductController;