import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ContentfulModule } from "./contentful/contentful.module";
import { CoffeesModule } from "./coffees/coffees.module";
import { ConfigModule } from "@nestjs/config";
import { ComponentsModule } from "./components/components.module";
import { AlgoliaModule } from "./algolia/algolia.module";
import { DatabaseModule } from "./database/database.module";
import { IamModule } from "./iam/iam.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ContentfulModule,
    CoffeesModule,
    ComponentsModule,
    AlgoliaModule,
    DatabaseModule,
    IamModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
