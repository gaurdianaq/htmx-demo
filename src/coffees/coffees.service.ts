import { HttpException, Injectable } from "@nestjs/common";
import { ContentfulService } from "src/contentful/contentful.service";
import {
  ICoffee,
  TAPIResponseMessage,
  TCoffeeHit,
  TDropDown,
  TLink,
} from "@/types";
import { AlgoliaService } from "src/algolia/algolia.service";
import { SearchIndex } from "algoliasearch";
import { ICoffeeEntry } from "@/componentContentfulTypes";
import { ResultAsync, ok } from "neverthrow";
import { COFFEE_ROUTE_NAME } from "./coffees.constants";
import { renderRichText } from "@/components/richtext";
import { Entry } from "@/contentfulTypes";

@Injectable()
export class CoffeesService {
  private COFFEE_INDEX_NAME = "coffee-index";
  constructor(
    private readonly contentfulService: ContentfulService,
    private readonly algoliaService: AlgoliaService
  ) {}

  getOne(coffeeID: string): ResultAsync<string, TAPIResponseMessage> {
    return this.contentfulService
      .getEntry<ICoffeeEntry>(coffeeID, {
        include: 2,
      })
      .map((coffee) => {
        return `<nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><a hx-get="/components/home" hx-target="#main-content">Home</a></li>
            <li><a hx-target="#main-content">${coffee.fields.roast}</a></li>
            <li><a hx-get="/${COFFEE_ROUTE_NAME}/${coffee.sys.id}" hx-target="#main-content">${coffee.fields.name}</a></li>
          </ul>
        </nav>
        ${renderRichText(coffee.fields.richTextDescription)}`;
      });
  }

  getCoffeeNavBarLinks(): ResultAsync<TDropDown[], TAPIResponseMessage> {
    return this.contentfulService
      .getEntries<ICoffeeEntry>({
        content_type: "coffee",
      })
      .map((coffees) => {
        const coffeeNavMap = new Map<string, Entry<ICoffeeEntry>[]>();
        coffees.items.forEach((coffee) => {
          if (!coffeeNavMap.has(coffee.fields.roast)) {
            coffeeNavMap.set(coffee.fields.roast, []);
          }
          coffeeNavMap.get(coffee.fields.roast).push(coffee);
        });

        let dropDown: TDropDown[] = [];
        coffeeNavMap.forEach((coffees, key) => {
          dropDown.push({
            label: key,
            navbarLinks: coffees.map<TLink>((coffeeEntry): TLink => {
              return {
                label: coffeeEntry.fields.name,
                target: `/${COFFEE_ROUTE_NAME}/${coffeeEntry.sys.id}`,
              };
            }),
          });
        });
        return dropDown;
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
