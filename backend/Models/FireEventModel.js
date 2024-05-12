import Database from "../Config/Database.js";
import FireSensorModel from "./FireSensorModel.js";
import { DataTypes } from "sequelize";

const FireEvent = Database.define(
  "fire_event",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING,
    },
    event_type: {
      type: DataTypes.ENUM("fire", "smoke"),
    },
    fire_sensor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FireSensorModel,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default FireEvent;
