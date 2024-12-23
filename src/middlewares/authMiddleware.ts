import { prismaClient } from "../applications/database";
import { ResponseError } from "../error/response-error";
import { UserRequest } from "../types/user-request";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = async(
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.get("x-API-TOKEN")

    if(token){
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        })

        if(user){
            req.user = user
            next()
            return
        }    
    }

    next(new ResponseError(403, "You are forbidden to access this page!"))
}