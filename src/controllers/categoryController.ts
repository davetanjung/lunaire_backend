import { NextFunction, Request, Response } from "express";
import { CategoryResponse } from "../models/Category";
import { categoryService } from "../services/category-service";

export class categoryController {

    static async getAllCategories(req: Request, res: Response, next: NextFunction) {
            try {
                const response: CategoryResponse[] = await categoryService.getAllCategories();
    
                res.status(201).json({
                    data: response
                });
            } catch (error) {
                next(error);
            }
        }
        
}