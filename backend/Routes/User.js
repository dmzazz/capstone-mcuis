import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  changePassword,
  SosSendToFireFighter,
  GetNotificationMessage,
} from "../Controllers/UserController.js";
import { refreshToken } from "../Middleware/RefreshToken.js";
import { VerifyToken } from "../Middleware/VerifyToken.js";

const router = express.Router();

router.get("/users", VerifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.post("/sos", VerifyToken, SosSendToFireFighter); // Rute untuk mengirim notifikasi ke pemadam kebakaran
router.get("/user/notification/:id", GetNotificationMessage); // Rute untuk menerima notifikasi dari pemadam kebakaran
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.put("/change-password", VerifyToken, changePassword);

export default router;
