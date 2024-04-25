import express from "express";
import { VerifyToken } from "../Middleware/VerifyToken.js";
import {
  CreateFireFighter,
  GetAllFireFighters,
  GetFireFighterById,
  UpdateFireFighter,
  DeleteFireFighter,
  SendConfirmation,
  GetNotificationMessage,
} from "../Controllers/FireFighterController.js";

const router = express.Router();

router.post("/firefighter", CreateFireFighter);
router.post("/firefighter/confirmation/:userId", VerifyToken, SendConfirmation);
router.get("/firefighter", GetAllFireFighters);
router.get("/firefighter/:id", GetFireFighterById);
router.get("/firefighter/notification/:id", GetNotificationMessage);
router.put("/firefighter/:id", UpdateFireFighter);
router.delete("/firefighter/:id", DeleteFireFighter);

export default router;
