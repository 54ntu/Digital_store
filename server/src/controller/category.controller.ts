import type { Request, Response } from "express";
import { Category } from "../models/category.model.js";

class CategoryController {
    // Controller methods will be implemented here
    static async addCategory(req: Request, res: Response) {
        try {
            // Implementation for adding a category
            const { categoryName } = req.body;

            if (!categoryName) {
                return res.status(400).json({ message: "Category name is required" });
            }

            //check whether category already exists
            const existingCategory = await Category.findAll({
                where: {
                    categoryName: categoryName
                }
            })

            if (existingCategory.length > 0) {
                return res.status(409).json({ message: "Category already exists" });
            }

            const newCategory = await Category.create({
                categoryName: categoryName
            })

            if (!newCategory) {
                return res.status(500).json({ message: "Failed to create category" });
            }

            return res.status(201).json({
                message: "Category created successfully",
                category: newCategory
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error",
                error: error
            })

        }

    }

    


}


export default CategoryController;