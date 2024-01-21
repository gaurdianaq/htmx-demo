import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import databaseConfig from "./config/databaseConfig";
import { Client } from "pg";
import { ConfigModule, ConfigType } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [
    {
      provide: "DATABASE_CLIENT",
      useFactory: async (config: ConfigType<typeof databaseConfig>) => {
        const client = new Client({
          host: config.dbHost || "localhost",
          port: config.dbPort,
          user: config.dbUser,
          password: config.dbPassword,
          database: config.dbName,
        });

        await client.connect();
        return client;
      },
      inject: [databaseConfig.KEY],
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
