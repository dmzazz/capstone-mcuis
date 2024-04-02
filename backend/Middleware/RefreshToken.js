import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Missing refresh token" });
    }

    // Verifikasi dan dekripsi token penyegar
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Cari pengguna berdasarkan ID token
    const user = await UserModel.findByPk(decoded.userId);
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Membuat token akses baru
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m", // Ubah sesuai kebutuhan Anda
      }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Refresh token expired" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
