import { HandleSensorDetection } from "../Controllers/FireEventController.js";
import express from "express";

const router = express.Router();

router.post("/fire-event", HandleSensorDetection);

export default router;
