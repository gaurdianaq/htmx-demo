import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UsersService } from "./users.service";
import { users } from "./users.schema";

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersService,
    {
      provide: "USER_TABLE",
      useValue: users,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
