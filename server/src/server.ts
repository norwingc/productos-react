import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptios } from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

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

const corsOptions: CorsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

const server = express();
server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan("dev"));
server.use("/api/products", router);

server.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptios)
);

export default server;
