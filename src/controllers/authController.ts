import { userRegister, userRegisterResponse } from "../models/User"
import { NextFunction, Request, Response } from "express";
import { authService } from "../services/authService";


export class authController{

    static async register(req: Request, res: Response, next: NextFunction){
        try {
            const request: userRegister = req.body as userRegister
            const response: userRegisterResponse = await authService.register(request)
    
            res.status(200).json({ 
                data: response,
            })
    
        } catch (error) {
            // passing error ke middleware pake next
            next(error)
        }
}
}
