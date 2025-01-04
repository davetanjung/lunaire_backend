import { prismaClient } from "../applications/database";
import { CreateActivityRequest, DeleteActivityRequest, ReadActivityResponse, ReadUserActivitiesResponse, UpdateActivityRequest } from "../models/Activity";
import { activityValidation } from "../validations/activity-validation";
import { Validation } from "../validations/validation";

export class activityService {

    static async createActivity(req: CreateActivityRequest): Promise<string> {
        const createActivityReq = Validation.validate(
            activityValidation.CREATE,
            req
        )

        const activity = await prismaClient.activity.create({
            data: {
                name: createActivityReq.name,
                start_time: new Date(`${createActivityReq.date}T${createActivityReq.start_time}:00Z`),
                end_time: new Date(`${createActivityReq.date}T${createActivityReq.end_time}:00Z`),
                date: new Date(createActivityReq.date), // Prisma will store it as midnight UTC.
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
                date: updateActivityReq.date
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
//hhhhhhhhhhhhhppppppppppppppppp