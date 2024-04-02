import Database from "../Config/Database";
import FireSensorModel from "./FireSensorModel";
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
      allowNull: false,
    },
    event_type: {
      type: DataTypes.ENUM("fire", "smoke"),
      allowNull: false,
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
