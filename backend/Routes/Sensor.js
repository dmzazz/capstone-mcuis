import express from "express";
import {
  SaveSensorData,
  GetSensorData,
} from "../Controllers/SensorController.js";

const router = express.Router();

router.post("/sensor", SaveSensorData);
router.get("/sensor", GetSensorData);

export default router;
