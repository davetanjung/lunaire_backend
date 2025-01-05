import { prismaClient } from "../applications/database";
import { CategoryResponse } from "../models/Category";

export class categoryService {
    static async getAllCategories(): Promise<CategoryResponse[]> {
            const categories = await prismaClient.category.findMany({
            });
    
            const response = categories.map((category) => {
                return {
                    id: category.id,
                    name: category.name
                };
            });
    
            return response;
        }
}