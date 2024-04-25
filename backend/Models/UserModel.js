import Database from "../Config/Database.js";
import { DataTypes } from "sequelize";

const UserModel = Database.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.ENUM("admin", "user", "firefighter"),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
    },
    emergency_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    confirmation_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default UserModel;
