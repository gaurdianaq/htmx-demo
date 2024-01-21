import { Module } from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { ContentfulModule } from "src/contentful/contentful.module";
import { CoffeesController } from "./coffees.controller";
import { AlgoliaModule } from "src/algolia/algolia.module";

@Module({
  imports: [ContentfulModule, AlgoliaModule],
  providers: [CoffeesService],
  controllers: [CoffeesController],
})
export class CoffeesModule {}
