import { prismaClient } from './database';

async function seedCategories(): Promise<void> {
    const categories: string[] = ["Sleep", "Eat", "Exercise", "Play", "Work"];

    for (const name of categories) {
        await prismaClient.category.upsert({
            where: { name }, 
            update: {},     
            create: { name },
        });
    }

    console.log("Categories seeded successfully!");
}

seedCategories()
    .catch((error: unknown) => {
        console.error("Error seeding categories:", error);
        process.exit(1); // Exit process with error
    })
    .finally(async () => {
        await prismaClient.$disconnect(); // Disconnect Prisma Client
    });
