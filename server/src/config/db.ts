import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
    models: [__dirname + "/../models/**/*"],
    logging: false,
});

// const db = new Sequelize("api", "root", "123456789", {
//     host: "localhost",
//     dialect: "postgres",
// });

export default db;
