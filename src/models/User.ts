import { User } from "@prisma/client";

export interface RegisterUserRequest {
    username: string;
    password: string;
    email: string;
}

export interface UserResponse {
    token? : string;
    username: string;
}

export interface LoginUserRequest {
    email: string;
    password: string;
}

export interface UserListResponse {
    id: string;
    username: string;
    email: string;
}


export function toUserResponse (user: User) {
    return {
        token: user.token ?? "",
        username: user.username,
    }
}