import Database from "../Config/Database";
import { DataTypes } from "sequelize";

const HotspotModel = Database.define("hotspot", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
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
});

export default HotspotModel;
