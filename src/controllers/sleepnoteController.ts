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
            const user = (req as any).user; // Assuming user is set in middleware
            if (!user) {
                throw new ResponseError(401, "Unauthorized");
            }

            const response: SleepNoteResponse[] = await SleepNoteService.getAllSleepNotes(user);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getSleepNoteById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = (req as any).user;
            const { id } = req.params;

            if (!user) {
                throw new ResponseError(401, "Unauthorized");
            }

            if (!id || isNaN(Number(id))) {
                throw new ResponseError(400, "Invalid sleep note ID");
            }

            const response: SleepNoteResponse = await SleepNoteService.getSleepNote(user, Number(id));

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async createSleepNote(req: Request, res: Response, next: NextFunction) {
        try {
            const user = (req as any).user;
            const request: SleepNoteCreateRequest = req.body;

            if (!user) {
                throw new ResponseError(401, "Unauthorized");
            }

            const message: string = await SleepNoteService.createSleepNote(user, request);

            res.status(201).json({
                message: message,
            });
        } catch (error) {
            next(error);
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
