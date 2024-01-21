import { Module } from "@nestjs/common";
import { ComponentsController } from "./components.controller";
import { ContentfulModule } from "src/contentful/contentful.module";
import { ComponentsService } from "./components.service";

@Module({
  imports: [ContentfulModule],
  controllers: [ComponentsController],
  providers: [ComponentsService],
})
export class ComponentsModule {}
