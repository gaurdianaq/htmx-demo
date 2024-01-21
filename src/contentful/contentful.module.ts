import { Module } from "@nestjs/common";
import { ContentfulService } from "./contentful.service";
import { ConfigModule } from "@nestjs/config";
import contentfulConfig from "./config/contentfulConfig";

@Module({
  imports: [ConfigModule.forFeature(contentfulConfig)],
  providers: [ContentfulService],
  exports: [ContentfulService],
})
export class ContentfulModule {}
