import { prismaClient } from "../applications/database";
import { CreateActivityRequest, DeleteActivityRequest, ReadActivityResponse, ReadUserActivitiesResponse, UpdateActivityRequest } from "../models/Activity";
import { activityValidation } from "../validations/activity-validation";
import { Validation } from "../validations/validation";
import { toDate, toZonedTime, format } from 'date-fns-tz';

export class activityService {

    static async createActivity(req: CreateActivityRequest): Promise<string> {

        const jakartaTimeZone = 'Asia/Jakarta';

        const createActivityReq = Validation.validate(
            activityValidation.CREATE, 
            req
        );

        const jakartaDate = toZonedTime(`${createActivityReq.date}T${createActivityReq.start_time}:00`, jakartaTimeZone);
        const jakartaEndDate = toZonedTime(`${createActivityReq.date}T${createActivityReq.end_time}:00`, jakartaTimeZone);

        const startTimeInUtc = new Date(jakartaDate.getTime() - (7 * 60 * 60 * 1000));  
        const endTimeInUtc = new Date(jakartaEndDate.getTime() - (7 * 60 * 60 * 1000));

        await prismaClient.activity.create({
            data: {
                name: createActivityReq.name,
                start_time: startTimeInUtc,
                end_time: endTimeInUtc,
                date: startTimeInUtc,  
                userId: createActivityReq.userId,
                categoryId: createActivityReq.categoryId
            }
        });

        return "Activity created successfully!"
    }

    static async getAllActivity(): Promise<ReadActivityResponse[]> {
        const activities = await prismaClient.activity.findMany({
            include: {
                user: true,
                category: true,
            },
        });

        const response = activities.map((activity) => {
            return {
                name: activity.name,
                start_time: activity.start_time.toISOString(),
                end_time: activity.end_time.toISOString(),
                date: activity.date.toISOString(),
                user: {
                    name: activity.user?.username ?? "Unknown User",
                    email: activity.user?.email ?? "Unknown Email",
                },
                category: {
                    name: activity.category?.name ?? "Uncategorized",
                },
            };
        });

        return response;
    }

    static async getUserActivities(userId: number): Promise<ReadUserActivitiesResponse[]> {
        const activities = await prismaClient.activity.findMany({
            where: {
                userId: userId,
            },
            include: {
                category: true,
            }
        });

        const response = activities.map((activity) => {
            return {
                name: activity.name,
                start_time: activity.start_time.toISOString(),
                end_time: activity.end_time.toISOString(),
                date: activity.date.toISOString(),
                category: {
                    name: activity.category?.name ?? "Uncategorized",
                },
            }
        })

        return response;
    }

    static async getActivityById(activityId: number): Promise<ReadUserActivitiesResponse> {
        const activity = await prismaClient.activity.findUnique({
            where: {
                id: activityId,
            },
            include: {
                category: true,
            },
        });

        if (!activity) {
            throw new Error("Activity not found.");
        }

        return {
            name: activity.name,
            start_time: activity.start_time.toISOString(),
            end_time: activity.end_time.toISOString(),
            date: activity.date.toISOString(),
            category: {
                name: activity.category?.name || "Uncategorized",
            },
        };
    }

    static async getActivityByDate(userId: number, specificDate?: string): Promise<ReadUserActivitiesResponse[]> {

        let activityDate: Date;

        const jakartaTimeZone = 'Asia/Jakarta';

        if (specificDate) {
            const jakartaTime = toZonedTime(specificDate, jakartaTimeZone); // Convert from string to Jakarta time
            activityDate = toDate(jakartaTime); // Make sure it's converted to a Date object
        } else {
            const nowInJakarta = new Date();
            const jakartaTime = toZonedTime(nowInJakarta, jakartaTimeZone); // Convert from current UTC time to Jakarta time
            activityDate = toDate(jakartaTime); // Ensure it's a Date object
        }

        activityDate.setUTCHours(0, 0, 0, 0);

        const activities = await prismaClient.activity.findMany({
            where: {
                userId: userId,
                date: activityDate,
            },
            include: {
                category: true,
            },
        });

        const response = activities.map((activity) => ({
            name: activity.name,
            start_time: activity.start_time.toISOString(),
            end_time: activity.end_time.toISOString(),
            date: activity.date.toISOString(),
            category: {
                name: activity.category?.name ?? "Uncategorized",
            },
        }));

        return response;
    }



    static async updateActivity(
        req: UpdateActivityRequest
    ): Promise<string> {

        const updateActivityReq = Validation.validate(
            activityValidation.UPDATE,
            req
        )

        const activityUpdate = await prismaClient.activity.update({
            where: {
                id: updateActivityReq.id,
            },
            data: {
                name: updateActivityReq.name,
                start_time: updateActivityReq.start_time,
                end_time: updateActivityReq.end_time,
                date: updateActivityReq.date,
                categoryId: updateActivityReq.categoryId
            },
        })
        return "Activity updated successfully!"
    }

    static async deleteActivity(req: DeleteActivityRequest): Promise<string> {

        const deleteActivityReq = Validation.validate(
            activityValidation.DELETE,
            req
        )

        const mataKuliahDelete = await prismaClient.activity.delete({
            where: {
                id: deleteActivityReq.id,
            }
        })

        return "Mata Kuliah deleted successfully!"
    }


}