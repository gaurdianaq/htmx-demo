import { registerAs } from "@nestjs/config";
/*
import * as dotenv from "dotenv";

//this feels a bit hackish but I'm not entirely sure how to combine
dotenv.config();*/

export default registerAs("database", () => {
  return {
    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT),
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  };
});
