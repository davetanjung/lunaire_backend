import { randomUUID } from "crypto";
import { prismaClient } from "../applications/database";
import { ResponseError } from "../error/response-error";
import { toUserResponse, userRegister, userRegisterResponse } from "../models/User";
import { userValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt";

export class authService {

    static async register(req: userRegister): Promise<userRegisterResponse> {

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
}