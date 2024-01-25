import { Module } from "@nestjs/common";
import { ContentfulModule } from "./contentful/contentful.module";
import { CoffeesModule } from "./coffees/coffees.module";
import { ConfigModule } from "@nestjs/config";
import { ComponentsModule } from "./components/components.module";
import { AlgoliaModule } from "./algolia/algolia.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ContentfulModule,
    CoffeesModule,
    ComponentsModule,
    AlgoliaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
