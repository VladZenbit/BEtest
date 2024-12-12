import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, "../modules/**/**/*.entity.{ts,js}")],
  synchronize: process.env.TYPEORM_SYNC === "true",
  ssl: { rejectUnauthorized: false }
};
