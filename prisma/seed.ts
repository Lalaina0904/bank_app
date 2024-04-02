import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    const password = await bcrypt.hash("123456", 10);
    const userTest1 = await db.user.create({
        data: {
            email: "polaire@gmail.com",
            username: "polaire",
            password,
        },
    });

    const bankAccountTest1 = await db.bank_account.create({
        data: {
            account_number: 123456789,
            client_name: "John",
            client_last_name: "Doe",
            birthdate: new Date("1990-01-01"),
            monthly_net_income: 2000,
            is_eligible: true,
            user_id: userTest1.user_id,
        },
    });

    console.table(userTest1);
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
