import { Diary } from "@prisma/client";

export interface SleepNoteResponse {
    id: number;
    entry_date: string;
    bed_time: string;
    wake_time: string;
    sleep_hours: number;  // Misalnya, hitung selisih antara bed_time dan wake_time
    mood: string;
    userId: number;  // ID pengguna yang memiliki catatan tidur ini
}


export function toSleepNoteResponseList(prismaDiary: Diary[]): SleepNoteResponse[] {
    return prismaDiary.map((diary) => {
        return {
            id: diary.id,
            bed_time: diary.bed_time.toISOString(),
            wake_time: diary.wake_time.toISOString(),
            sleep_hours: diary.sleep_hours,
            mood: diary.mood,
            entry_date: diary.entry_date.toISOString(),
            userId: diary.userId,
        };
    });
}

export function toSleepNoteResponse(prismaDiary: Diary): SleepNoteResponse {
    return {
        id: prismaDiary.id,
        bed_time: prismaDiary.bed_time.toISOString(),
        wake_time: prismaDiary.wake_time.toISOString(),
        sleep_hours: prismaDiary.sleep_hours,
        mood: prismaDiary.mood,
        entry_date: prismaDiary.entry_date.toISOString(),
        userId: prismaDiary.userId,
    };
}

export interface SleepNoteCreateRequest {
    bed_time: string; // ISO string format
    wake_time: string; // ISO string format
    mood: string;
    entry_date: string; // ISO string format
    userId: number;
}

export interface SleepNoteUpdateRequest {
    id: number;
    bed_time?: string; // ISO string format
    wake_time?: string; // ISO string format
    mood?: string;
    entry_date?: string; // ISO string format
    userId?: number;
}
