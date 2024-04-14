import express from "express";
import {
  SaveSensorData,
  getAllSensors,
} from "../Controllers/SensorController.js";

const router = express.Router();

router.post("/sensor", SaveSensorData);
router.get("/sensor", getAllSensors);

export default router;
