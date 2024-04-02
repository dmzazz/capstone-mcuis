import express from "express";
import { SaveSensorData } from "../Controllers/SensorController.js";

const router = express.Router();

router.post("/sensor", SaveSensorData);

export default router;
