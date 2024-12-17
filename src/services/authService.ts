import { randomUUID } from "crypto";
import { prismaClient } from "../applications/database";
import { ResponseError } from "../error/response-error";
import { LoginUserRequest, toUserResponse, UserRegisterRequest, UserRegisterResponse } from "../models/User";
import { userValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export class authService {

    static async register(req: UserRegisterRequest): Promise<UserRegisterResponse> {

        const registerReq = Validation.validate(
            userValidation.REGISTER,
            req
        )

        const email = await prismaClient.user.findFirst({
            where: {
                email: registerReq.email
            }
        })

        if (email) {
            throw new ResponseError(400, "Email already exist")
        }

        registerReq.password = await bcrypt.hash(registerReq.password, 10)

        const user = await prismaClient.user.create({
            data: {
                username: registerReq.username,
                email: registerReq.email,
                password: registerReq.password,
            }
        })


        return toUserResponse(user)

    }

    static async login(request: LoginUserRequest): Promise<UserRegisterResponse>{

        const loginRequest = Validation.validate(userValidation.LOGIN, request)

        let user = await prismaClient.user.findFirst({
            where: {
                email: loginRequest.email
            }
        })

        if(!user){
            throw new ResponseError(400, "Invalid email or password!")
        }

        const passwordIsValid = await bcrypt.compare(
            loginRequest.password,
            user.password
        )

        if(!passwordIsValid) {
            throw new ResponseError(400, "Invalid email or password!")
        }

        // Token diupdate karena setiap user beroperasi token harus baru demi safety
        // user = await prismaClient.user.update({
        //     where: {
        //         id: user.id,
        //     },
        //     data: {
        //         token: uuid()
        //     }
        // })

        const response = toUserResponse(user)

        return response

    }

    // static async logout(user: User): Promise<string>{
          
    //     await prismaClient.user.update({
    //         where: {
    //             id: user.id,
    //         },
    //         data:{
    //             token: null
    //         }
    //     })

    //     return "Logout succesful!"
    // }

}