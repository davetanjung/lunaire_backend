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
    static async getAllSleepNotes(user: User): Promise<SleepNoteResponse[]> {
        const diaries = await prismaClient.diary.findMany({
            where: {
                userId: user.id,
            },
        });

        return toSleepNoteResponseList(diaries);
    }

    static async getSleepNote(user: User, diaryId: number): Promise<SleepNoteResponse> {
        const diary = await this.checkSleepNoteExists(user.id, diaryId);

        return toSleepNoteResponse(diary);
    }

    static async createSleepNote(
        user: User,
        req: SleepNoteCreateRequest
    ): Promise<string> {
        // Validate request
        const validatedRequest = Validation.validate(SleepNoteValidation.CREATE, req);

        const diary = await prismaClient.diary.create({
            data: {
                bed_time: new Date(validatedRequest.bed_time),
                wake_time: new Date(validatedRequest.wake_time),
                sleep_hours:
                    (new Date(validatedRequest.wake_time).getTime() -
                        new Date(validatedRequest.bed_time).getTime()) /
                    (1000 * 60 * 60), // Calculate hours
                mood: validatedRequest.mood,
                entry_date: new Date(validatedRequest.entry_date),
                userId: user.id,
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
