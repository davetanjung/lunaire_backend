import { User } from "@prisma/client";

export interface userRegister {
    username: string;
    email: string;
    password: string;
}

export interface userRegisterResponse {
    username: string;
    email: string;
    password: string;
}

export function toUserResponse (user: User) {
    return {
        username: user.username,
        email: user.email,
        password: user.password
    }
}