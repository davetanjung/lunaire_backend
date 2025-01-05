import { z, ZodType } from "zod";

export class SleepNoteValidation {
    static readonly CREATE: ZodType = z.object({
        bed_time: z.string().min(1, "Bed time is required"), // ISO string format
        wake_time: z.string().min(1, "Wake time is required"), // ISO string format
        mood: z.string().min(1, "Mood is required").max(50, "Mood is too long"),
        entry_date: z.string().min(1, "Entry date is required"), // ISO string format
        userId: z.number().positive("User ID must be positive"),
    });

    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive("ID must be positive"),
        bed_time: z.string().optional(), // ISO string format
        wake_time: z.string().optional(), // ISO string format
        mood: z.string().max(50, "Mood is too long").optional(),
        entry_date: z.string().optional(), // ISO string format
        userId: z.number().positive("User ID must be positive").optional(),
    });
}
