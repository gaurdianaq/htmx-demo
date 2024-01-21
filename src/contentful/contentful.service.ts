import { Inject, Injectable } from "@nestjs/common";
import {
  ContentfulClientApi,
  EntriesQueries,
  EntryQueries,
  EntrySkeletonType,
  createClient,
} from "contentful";
import contentfulConfig from "./config/contentfulConfig";
import { ConfigType } from "@nestjs/config";
import { Entry, EntryCollection } from "@/contentfulTypes";
import { ResultAsync } from "neverthrow";
import { TAPIResponseMessage } from "@/types";
import { createResponseMessage } from "@/utils";

@Injectable()
export class ContentfulService {
  private readonly client: ContentfulClientApi<undefined>;
  constructor(
    @Inject(contentfulConfig.KEY)
    private contentfulConfiguration: ConfigType<typeof contentfulConfig>
  ) {
    this.client = createClient(this.contentfulConfiguration);
  }

  getEntry<T>(
    entryID: string,
    query?: EntryQueries<undefined>
  ): ResultAsync<Entry<T>, TAPIResponseMessage> {
    return ResultAsync.fromPromise(
      this.client.getEntry(entryID, query) as Promise<Entry<T>>,
      (error) => {
        return createResponseMessage(400, error);
      }
    );
  }

  getEntries<T>(
    query: EntriesQueries<EntrySkeletonType, undefined>
  ): ResultAsync<EntryCollection<T>, TAPIResponseMessage> {
    return ResultAsync.fromPromise(
      this.client.getEntries(query) as Promise<EntryCollection<T>>,
      (error) => {
        return createResponseMessage(400, error);
      }
    );
  }
}
