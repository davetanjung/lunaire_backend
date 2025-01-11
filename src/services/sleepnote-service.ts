import { Diary, User } from "@prisma/client";
import {
    SleepNoteCreateRequest,
    SleepNoteResponse,
    SleepNoteUpdateRequest,
    toSleepNoteResponse,
    toSleepNoteResponseList,
} from "../models/SleepNoteModel";
import { prismaClient } from "../applications/database";
import { Validation } from "../validations/validation";
import { SleepNoteValidation } from "../validations/sleepnote-validation";
import { ResponseError } from "../error/response-error";
import { logger } from "../applications/logging";

export class SleepNoteService {


    static async getAllSleepNotes(userId: number): Promise<SleepNoteResponse[]> {
        const diaries = await prismaClient.diary.findMany({
            where: {
                userId: userId, // Gunakan userId untuk mengambil catatan tidur
            },
        });
        // Map data dari database menjadi format SleepNoteResponse yang sesuai
        const response = diaries.map((diary) => {
            const bedTime = diary.bed_time; // Waktu tidur (pastikan ini dalam format Date)
            const wakeTime = diary.wake_time; // Waktu bangun (pastikan ini dalam format Date)
    
            // Hitung jumlah jam tidur (sleep_hours) berdasarkan bed_time dan wake_time
            const sleepHours = (new Date(wakeTime).getTime() - new Date(bedTime).getTime()) / (1000 * 60 * 60);
    
            return {
                id: diary.id,  // Menambahkan id
                entry_date: diary.entry_date.toISOString(),
                bed_time: bedTime.toISOString(),  // Pastikan ini dalam format string
                wake_time: wakeTime.toISOString(), // Pastikan ini dalam format string
                sleep_hours: sleepHours, // Hitung selisih jam tidur
                mood: diary.mood,
                userId: diary.userId,  // Menambahkan userId
            };
        });
    
        return response;
    }
    


    static async createSleepNote(req: SleepNoteCreateRequest): Promise<string> {
        // Validate request
        const validatedRequest = Validation.validate(SleepNoteValidation.CREATE, req);

        // Create sleep note in the database
        const diary = await prismaClient.diary.create({
            data: {
                bed_time: new Date(validatedRequest.bed_time),
                wake_time: new Date(validatedRequest.wake_time),
                sleep_hours:
                    (new Date(validatedRequest.wake_time).getTime() -
                        new Date(validatedRequest.bed_time).getTime()) /
                    (1000 * 60 * 60), // Calculate sleep hours in hours
                mood: validatedRequest.mood,
                entry_date: new Date(validatedRequest.entry_date),  // Store date as Date object
                userId: validatedRequest.userId,  // UserId from validated request
            },
        });

        logger.info("CREATE RESULT: " + diary);

        return "Sleep note created successfully!";
    }


    static async updateSleepNote(
        user: User,
        req: SleepNoteUpdateRequest
    ): Promise<string> {
        const validatedRequest = Validation.validate(SleepNoteValidation.UPDATE, req);

        await this.checkSleepNoteExists(user.id, validatedRequest.id);

        const updatedDiary = await prismaClient.diary.update({
            where: {
                id: validatedRequest.id,
            },
            data: {
                bed_time: validatedRequest.bed_time
                    ? new Date(validatedRequest.bed_time)
                    : undefined,
                wake_time: validatedRequest.wake_time
                    ? new Date(validatedRequest.wake_time)
                    : undefined,
                mood: validatedRequest.mood,
                entry_date: validatedRequest.entry_date
                    ? new Date(validatedRequest.entry_date)
                    : undefined,
                sleep_hours:
                    validatedRequest.bed_time && validatedRequest.wake_time
                        ? (new Date(validatedRequest.wake_time).getTime() -
                              new Date(validatedRequest.bed_time).getTime()) /
                          (1000 * 60 * 60)
                        : undefined,
            },
        });

        logger.info("UPDATE RESULT: " + updatedDiary);

        return "Sleep note updated successfully!";
    }

    static async deleteSleepNote(user: User, diaryId: number): Promise<string> {
        await this.checkSleepNoteExists(user.id, diaryId);

        await prismaClient.diary.delete({
            where: {
                id: diaryId,
            },
        });

        return "Sleep note deleted successfully!";
    }

    static async checkSleepNoteExists(userId: number, diaryId: number): Promise<Diary> {
        const diary = await prismaClient.diary.findFirst({
            where: {
                id: diaryId,
                userId: userId,
            },
        });

        if (!diary) {
            throw new ResponseError(404, "Sleep note not found!");
        }

        return diary;
    }
}
