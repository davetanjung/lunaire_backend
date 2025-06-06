import { NextFunction, Request, Response } from "express";
import { CreateActivityRequest, DeleteActivityRequest, ReadActivityResponse, ReadUserActivitiesResponse, UpdateActivityRequest } from "../models/Activity";
import { activityService } from "../services/activity-service";

export class activityController {

    static async createActivity(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateActivityRequest = req.body as CreateActivityRequest;
            const response: string = await activityService.createActivity(request);

            res.status(201).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllActivity(req: Request, res: Response, next: NextFunction) {
        try {
            const response: ReadActivityResponse[] = await activityService.getAllActivity();

            res.status(201).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUserActivities(req: Request, res: Response, next: NextFunction) {
        try{
            const userId: number = Number(req.params.userId);
            const response: ReadUserActivitiesResponse[] = await activityService.getUserActivities(userId);

            res.status(201).json({
                data: response
            })
        } catch (error){
            next(error);
        }
    }

    static async getActivityByDate(req: Request, res: Response, next: NextFunction) {
        try{
            const userId: number = Number(req.params.userId);
            const specificDate: string | undefined = req.query.date as string;
            const response: ReadUserActivitiesResponse[] = await activityService.getActivityByDate(userId, specificDate);

            res.status(201).json({
                data: response
            })
        } catch (error){
            next(error);
        }
    }

    static async getActivityById(req: Request, res: Response, next: NextFunction) {
        try{
            const activityId: number = Number(req.params.activityId);
            const response: ReadUserActivitiesResponse = await activityService.getActivityById(activityId);

            res.status(201).json({
                data: response
            })
        } catch (error){
            next(error);
        }
    }

    static async updateActivity(req: Request, res: Response, next: NextFunction) {
        try {
            const request: UpdateActivityRequest = req.body as UpdateActivityRequest;
            const response: string = await activityService.updateActivity(request);

            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    static async deleteActivity(req: Request, res: Response, next: NextFunction) {
        try {
            const request: DeleteActivityRequest = req.body as DeleteActivityRequest;
            const response: string = await activityService.deleteActivity(request);

            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

}