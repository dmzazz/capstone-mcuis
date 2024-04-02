import Database from "../Config/Database";
import FireEvent from "./FireEventModel";
import { DataTypes } from "sequelize";

const NotificationModel = Database.define(
  "notification",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FireEvent,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default NotificationModel;
