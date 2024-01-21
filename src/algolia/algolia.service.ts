import { Inject, Injectable } from "@nestjs/common";
import algoliasearch, { SearchClient, SearchIndex } from "algoliasearch";
import { SaveObjectResponse, DeleteResponse } from "@algolia/client-search";
import algoliaConfig from "./config/algoliaConfig";
import { ConfigType } from "@nestjs/config";
import { ResultAsync, Result } from "neverthrow";
import { TAPIResponseMessage } from "@/types";
import { createResponseMessage } from "@/utils";

@Injectable()
export class AlgoliaService {
  private algoliaClient: SearchClient;
  private safeInit;
  constructor(
    @Inject(algoliaConfig.KEY) config: ConfigType<typeof algoliaConfig>
  ) {
    this.algoliaClient = algoliasearch(config.appId, config.apiKey);
    this.safeInit = Result.fromThrowable(
      this.algoliaClient.initIndex,
      (error) => {
        return createResponseMessage(400, error);
      }
    );
  }

  saveContentToIndex(
    indexName: string,
    content: unknown
  ): ResultAsync<SaveObjectResponse, TAPIResponseMessage> {
    return this.safeInit(indexName).asyncAndThen((index) => {
      return ResultAsync.fromPromise(index.saveObject(content), (error) => {
        return createResponseMessage(400, error);
      });
    });
  }

  deleteContentFromIndex(
    indexName: string,
    objectID: string
  ): ResultAsync<DeleteResponse, TAPIResponseMessage> {
    return this.safeInit(indexName).asyncAndThen((index) => {
      return ResultAsync.fromPromise(index.deleteObject(objectID), (error) => {
        return createResponseMessage(400, error);
      });
    });
  }

  search<T>(
    indexName: string,
    query: string,
    page: number = 0,
    pageSize: number = 10
  ) {
    return this.safeInit(indexName).asyncAndThen((index) => {
      return ResultAsync.fromPromise(
        index.search<T>(query, {
          hitsPerPage: pageSize,
          page: page,
        }),
        (error) => {
          return createResponseMessage(400, error);
        }
      );
    });
  }
}
