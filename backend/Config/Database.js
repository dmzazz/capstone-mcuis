import { Sequelize } from "sequelize";

const Database = new Sequelize("sql8706536", "sql8706536", "2WPafSwzUs", {
  host: "sql8.freemysqlhosting.net",
  dialect: "mysql",
});

export default Database;
