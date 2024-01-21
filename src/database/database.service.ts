import { Inject, Injectable } from "@nestjs/common";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

@Injectable()
export class DatabaseService {
  readonly drizzleClient;

  constructor(
    @Inject("DATABASE_CLIENT")
    private readonly dbClient: Client
  ) {
    this.drizzleClient = drizzle(this.dbClient);
  }
}
