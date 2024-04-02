import express from "express";
import {
  CreateFireFighter,
  GetAllFireFighters,
  GetFireFighterById,
  UpdateFireFighter,
  DeleteFireFighter,
} from "../Controllers/FireFighterController.js";

const router = express.Router();

router.post("/firefighter", CreateFireFighter);
router.get("/firefighter", GetAllFireFighters);
router.get("/firefighter/:id", GetFireFighterById);
router.put("/firefighter/:id", UpdateFireFighter);
router.delete("/firefighter/:id", DeleteFireFighter);

export default router;
