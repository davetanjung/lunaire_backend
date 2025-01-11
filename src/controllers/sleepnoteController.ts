import { NextFunction, Request, Response } from "express";
import { 
    SleepNoteCreateRequest, 
    SleepNoteUpdateRequest, 
    SleepNoteResponse 
} from "../models/SleepNoteModel";
import { SleepNoteService } from "../services/sleepnote-service";
import { ResponseError } from "../error/response-error";

export class SleepNoteController {

    static async getAllSleepNotes(req: Request, res: Response, next: NextFunction) {
        try {
            // Pastikan userId ada dalam parameter URL
            const userId: number = Number(req.params.userId);  // Ambil userId dari parameter
    
            // Cek apakah userId valid
            if (!userId || isNaN(userId)) {
                throw new ResponseError(400, "Invalid userId");
            }
    
            // Panggil service untuk mendapatkan sleep notes berdasarkan userId
            const response: SleepNoteResponse[] = await SleepNoteService.getAllSleepNotes(userId);
    
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
    
    
    

    //controller
static async createSleepNote(req: Request, res: Response, next: NextFunction) {
    try {
        const request: SleepNoteCreateRequest = req.body;  // Ambil data dari body request
        const response: string = await SleepNoteService.createSleepNote(request); // Panggil service untuk membuat sleep note

        res.status(201).json({
            data: response, // Kembalikan response dalam format JSON
        });
    } catch (error) {
        next(error);  // Jika ada error, lemparkan ke error handler berikutnya
    }
}


    static async updateSleepNoteById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = (req as any).user;
            const request: SleepNoteUpdateRequest = req.body;

            if (!user) {
                throw new ResponseError(401, "Unauthorized");
            }

            const message: string = await SleepNoteService.updateSleepNote(user, request);

            res.status(200).json({
                message: message,
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteSleepNoteById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = (req as any).user;
            const { id } = req.params;

            if (!user) {
                throw new ResponseError(401, "Unauthorized");
            }

            if (!id || isNaN(Number(id))) {
                throw new ResponseError(400, "Invalid sleep note ID");
            }

            const message: string = await SleepNoteService.deleteSleepNote(user, Number(id));

            res.status(200).json({
                message: message,
            });
        } catch (error) {
            next(error);
        }
    }
}
