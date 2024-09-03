import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { dbConnection } from "./database/config";
import routeCats from "./routers/cats.routers";
import routeImages from "./routers/images.routers";
import routeUsers from "./routers/users.routers";

dotenv.config();

const app: Express = express();

dbConnection();

app.use(cors());

app.use(express.json());

// Rutas
app.use("/api/breeds", routeCats);
app.use("/api/images", routeImages);
app.use("/api/user", routeUsers);

const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
