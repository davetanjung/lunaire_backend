import { z, ZodType } from "zod";

export class activityValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(50),
        start_time: z.string().min(1).max(50),
        end_time: z.string().min(1).max(100),
        date: z.string().min(1).max(100),
        userId: z.number().positive(),
        categoryId: z.number().positive()
    })

    static readonly UPDATE: ZodType = z.object({
        id: z.number().int().positive(),
        name: z.string().min(1).max(50).optional(),
        start_time: z.string().min(1).max(50).optional(),
        end_time: z.string().min(1).max(100).optional(),
        date: z.string().min(1).max(100).optional(),
        categoryId: z.number().positive().optional(),
    })

    static readonly DELETE: ZodType = z.object({
        id: z.number().positive()
    })
}