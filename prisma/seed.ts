/* eslint-disable prettier/prettier */
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@helpers/auth";

const prisma = new PrismaClient();

async function main() {
    // const user = await prisma.user.upsert({
    //     create: {
    //         name: 'Victory Efekpogua',
    //         name_slug: 'victory-efekpogua-uekke',
    //         email: 'vic@gmail.com',
    //         password: await hashPassword('password'),
    //     },
    // });

    // const eventtype = await prisma.eventType.upsert({
    //     create: {
    //         title: "Quick chat with Simba",
    //         title_slug: "quick-chat-with-simba",
    //         description: "Qhick chat with developers",
    //         location: "Google Meet",
    //         length: 15,
    //     },
    // });
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
