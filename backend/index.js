import express from "express";
import Database from "./Config/Database.js";
import dotenv from "dotenv";
import UserRoutes from "./Routes/User.js";
import FireFighterRoutes from "./Routes/FireFighter.js";
import SensorRoutes from "./Routes/Sensor.js";
import EventRoutes from "./Routes/Event.js";
// import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

try {
  await Database.authenticate();
  console.log("Database Connected...");
} catch (error) {
  console.log("Failed to Connect Database!");
}

// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", UserRoutes, FireFighterRoutes, SensorRoutes, EventRoutes);

app.listen(5000, () => console.log("Server Running at port 5000... "));
