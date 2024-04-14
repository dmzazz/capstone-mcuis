import Database from "../Config/Database.js";
import UserModel from "./UserModel.js";
import { DataTypes } from "sequelize";

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
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
  },
});
export default FireFighterModel;
