import express from "express";
import { saveSensorData } from "../Controllers/SensorController";
import { VerifyToken } from "../Middleware/VerifyToken";

const router = express.Router();

router.post("/sensor", VerifyToken, saveSensorData);

export default router;
