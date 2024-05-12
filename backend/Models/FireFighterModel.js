import Database from "../Config/Database.js";
import { DataTypes } from "sequelize";
import UserModel from "./UserModel.js";

const FireFighterModel = Database.define("fire_fighter", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notification_message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  confirmed_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  confirmation_updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

FireFighterModel.belongsTo(UserModel);

export default FireFighterModel;
