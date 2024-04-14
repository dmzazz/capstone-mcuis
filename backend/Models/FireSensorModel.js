import Database from "../Config/Database.js";
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
    },
    sensor_type: {
      type: DataTypes.STRING,
    },
    smoke_value: {
      type: DataTypes.INTEGER,
    },
    fire_level: {
      type: DataTypes.INTEGER,
    },
    location: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "fire_sensor",
    underscored: true,
  }
);

export default FireSensorModel;
