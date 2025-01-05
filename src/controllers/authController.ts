import { LoginUserRequest, RegisterUserRequest, UserResponse } from "../models/User"
import { NextFunction, Request, Response } from "express";
import { authService } from "../services/authService";
import { UserRequest } from "../types/user-request";


export class authController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterUserRequest = req.body as RegisterUserRequest
            const response: UserResponse = await authService.register(request)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            // pass to the middleware if error exists
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as LoginUserRequest
            const response = await authService.login(request)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await authService.logout(req.user!)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }




}
