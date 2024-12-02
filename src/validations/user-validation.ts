import { z, ZodType } from "zod";

export class userValidation {
    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(1).max(50),
        email: z.string().min(1).max(50),
        password: z.string().min(1).max(100),
    })

    static readonly LOGIN: ZodType = z.object({
        email: z.string().min(1).max(50),
        password: z.string().min(1).max(100)
    })
    
}