import { HttpException, Injectable } from "@nestjs/common";
import { ContentfulService } from "src/contentful/contentful.service";
import { ICoffee, TAPIResponseMessage, TCoffeeHit } from "@/types";
import { AlgoliaService } from "src/algolia/algolia.service";
import { SearchIndex } from "algoliasearch";
import { ICoffeeEntry } from "@/componentContentfulTypes";
import { ResultAsync } from "neverthrow";

@Injectable()
export class CoffeesService {
  private COFFEE_INDEX_NAME = "coffee-index";
  constructor(
    private readonly contentfulService: ContentfulService,
    private readonly algoliaService: AlgoliaService
  ) {}

  getOne(coffeeID: string): ResultAsync<ICoffee, TAPIResponseMessage> {
    return this.contentfulService
      .getEntry<ICoffeeEntry>(coffeeID, {
        include: 2,
      })
      .map((coffee) => {
        return {
          name: coffee.fields.name,
          roast: coffee.fields.roast,
          richTextDescription: coffee.fields.richTextDescription,
          shortDescription: coffee.fields.shortDescription,
          brand: coffee.fields.brand.fields,
        };
      });
  }

  getAll(): ResultAsync<ICoffee[], TAPIResponseMessage> {
    return this.contentfulService
      .getEntries<ICoffeeEntry>({
        content_type: "coffee",
      })
      .map((coffees) => {
        return coffees.items.map((coffee): ICoffee => {
          return {
            name: coffee.fields.name,
            roast: coffee.fields.roast,
            richTextDescription: coffee.fields.richTextDescription,
            shortDescription: coffee.fields.shortDescription,
            brand: coffee.fields.brand.fields,
          };
        });
      });
  }

  indexCoffee(coffeeID: string) {
    return this.contentfulService
      .getEntry<ICoffeeEntry>(coffeeID)
      .andThen((entry) => {
        return this.algoliaService.saveContentToIndex(this.COFFEE_INDEX_NAME, {
          objectID: entry.sys.id,
          name: entry.fields.name,
          roast: entry.fields.roast,
          shortDescription: entry.fields.shortDescription,
          brand: entry.fields.brand.fields.name,
        });
      });
  }

  search(
    query: string,
    page: number = 0,
    pageSize: number = 10,
    locale: string = "en-US"
  ) {
    return this.algoliaService.search<TCoffeeHit>(
      this.COFFEE_INDEX_NAME,
      query,
      page,
      pageSize
    );
  }
}
