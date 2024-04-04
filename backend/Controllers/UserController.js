import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: ["id", "email", "role"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { email, role, password, confirmPassword } = req.body;

  // Check if email already exists in the database
  const existingUser = await UserModel.findOne({ where: { email: email } });
  if (existingUser) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords don't match" });
  }

  // Hash Password with bcrypt with Register account
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await UserModel.create({
      email: email,
      role: role,
      password: hashPassword,
    });
    res.json({ msg: "Create Account Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to create account" });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "Email tidak ditemukan" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "kata sandi salah" });
    }

    // Membuat token akses
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await UserModel.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: user.id,
        },
      }
    );

    // Menetapkan cookie refreshToken
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

//Logout

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  try {
    const user = await UserModel.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) return res.sendStatus(204);
    await UserModel.update(
      { refresh_token: null },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.clearCookie("refreshToken");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
