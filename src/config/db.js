import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  "defaultdb",
  "avnadmin",
  process.env.DB_PASSWORD,
  {
    host: "mysql-a55c7ce-content-broadcasting.a.aivencloud.com",
    port: 20439,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

export default sequelize;


