import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptios } from "./config/swagger";

async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.magenta("Conexión exitosa a la base de datos"));
    } catch (error) {
        console.log(error);
        console.log(colors.red.bold("No se pudo conectar a la base de datos"));
    }
}

connectDB();

const server = express();
server.use(express.json());
server.use("/api/products", router);

server.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptios)
);

export default server;
