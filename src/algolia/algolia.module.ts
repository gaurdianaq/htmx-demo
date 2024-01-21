import { Module } from "@nestjs/common";
import { AlgoliaService } from "./algolia.service";
import { ConfigModule } from "@nestjs/config";
import algoliaConfig from "./config/algoliaConfig";

@Module({
  imports: [ConfigModule.forFeature(algoliaConfig)],
  providers: [AlgoliaService],
  exports: [AlgoliaService],
})
export class AlgoliaModule {}
