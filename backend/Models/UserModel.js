import Database from "../Config/Database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;

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
  },
  {
    freezeTableName: true,
  }
);

export default UserModel;
