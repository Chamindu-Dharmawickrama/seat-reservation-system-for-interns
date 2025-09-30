import bcrypt from "bcrypt";
import DB from "../src/config/db.js";

const SALT_ROUNDS = 10;

// add ADMIN user to the system
// use command - npx prisma db seed
async function main() {
    console.log("Seeding admin user to the database...");

    const firstName = process.env.ADMIN_FIRSTNAME;
    const lastName = process.env.ADMIN_LASTNAME;
    const email = process.env.ADMIN_EMAIL;
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    const role = "ADMIN";

    const existingAdmin = await DB.user.findFirst({
        where: {
            OR: [{ email: email }, { username: username }],
        },
    });

    if (existingAdmin) {
        console.log(
            "Admin already exists with this email or user name. Skipping seed..."
        );
        return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const admin = await DB.user.upsert({
        where: {
            username,
        },
        update: {},
        create: {
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            role,
        },
    });

    console.log(`Admin created successfully! (${username})`);
}

// run the main function
main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
