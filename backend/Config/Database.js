import { Sequelize } from "sequelize";

const Database = new Sequelize("smart_evacuation", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default Database;
