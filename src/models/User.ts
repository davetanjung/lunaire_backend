import { User } from "@prisma/client";

export interface UserRegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface UserRegisterResponse {
    email: string;
    password: string;
}

export interface LoginUserRequest {
    email: string;
    password: string;
}

export function toUserResponse (user: User) {
    return {
        email: user.email,
        password: user.password
    }
}