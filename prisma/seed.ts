import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    const password = await bcrypt.hash("123456", 10);
    const polaire = await db.user.create({
        data: {
            email: "polaire@gmail.com",
            name: "polaire",
            password,
        },
    });

    console.table(polaire);
}

console.log("[DB]: seeding...🌱");
main()
    .then(async () => {
        await db.$disconnect();
        console.log("[DB]: seeded...🌳");
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });
