import { Test, TestingModule } from "@nestjs/testing";
import { ContentfulService } from "./contentful.service";
import { EntrySkeletonType } from "contentful";

describe("ContentfulService", () => {
  let service: ContentfulService<EntrySkeletonType, undefined>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentfulService],
    }).compile();

    service =
      module.get<ContentfulService<EntrySkeletonType, undefined>>(
        ContentfulService
      );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
