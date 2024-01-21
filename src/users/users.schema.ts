import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  userName: varchar("user_name", { length: 64 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
});

export type UserTable = typeof users;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
