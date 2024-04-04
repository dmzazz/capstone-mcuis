import Database from "../Config/Database.js";
import UserModel from "./UserModel.js";
import { DataTypes } from "sequelize";

const FireSensorModel = Database.define(
  "fire_sensor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sensor_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sensor_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    smoke_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fire_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "fire_sensor",
    underscored: true,
  }
);

export default FireSensorModel;
