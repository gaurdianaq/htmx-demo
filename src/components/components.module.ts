import { Module } from "@nestjs/common";
import { ComponentsController } from "./components.controller";
import { ContentfulModule } from "src/contentful/contentful.module";
import { ComponentsService } from "./components.service";
import { CoffeesModule } from "@/coffees/coffees.module";

@Module({
  imports: [ContentfulModule, CoffeesModule],
  controllers: [ComponentsController],
  providers: [ComponentsService],
})
export class ComponentsModule {}
