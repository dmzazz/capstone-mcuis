import {
  HandleSensorDetection,
  getFireEvents,
} from "../Controllers/FireEventController.js";
import express from "express";

const router = express.Router();

router.post("/fire-events", HandleSensorDetection);
router.get("/fire-events", getFireEvents);

export default router;
