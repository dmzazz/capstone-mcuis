import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
} from "../Controllers/UserController.js";
import { refreshToken } from "../Middleware/RefreshToken.js";
import { VerifyToken } from "../Middleware/VerifyToken.js";

const router = express.Router();

router.get("/users", VerifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
