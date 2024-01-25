import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { TCoffeeHit } from "@/types";
import { ApiKeyGuard } from "src/common/api-key/api-key.guard";
import { renderRichText } from "@/components/richtext"; //bad practice but rushing to get this out
import { COFFEE_ROUTE_NAME } from "./coffees.constants";

@Controller(COFFEE_ROUTE_NAME)
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get("searchCoffee")
  searchCoffee(
    @Query() query: { searchQuery: string; page: number; pageSize: number }
  ) {
    return this.coffeesService
      .search(query.searchQuery, query.page, query.pageSize)
      .match(
        (results) => {
          return results.hits.map((hit): TCoffeeHit => {
            return {
              objectID: hit.objectID,
              name: hit.name,
              brand: hit.brand,
              shortDescription: hit.shortDescription,
              roast: hit.roast,
            };
          });
        },
        (error) => {
          throw new HttpException(error.message, error.statusCode);
        }
      );
  }

  @Get("getCoffees")
  findAll() {
    return this.coffeesService.getAll().match(
      (coffees) => {
        return coffees;
      },
      (error) => {
        throw new HttpException(error.message, error.statusCode);
      }
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coffeesService.getOne(id).match(
      (coffee) => {
        return coffee;
      },
      (error) => {
        throw new HttpException(error.message, error.statusCode);
      }
    );
  }

  @UseGuards(ApiKeyGuard)
  @Post("indexCoffee")
  indexCoffee(@Body() coffeeEntry: { entryId: string }) {
    return this.coffeesService.indexCoffee(coffeeEntry.entryId).match(
      (response) => {
        return response;
      },
      (error) => {
        throw new HttpException(error.message, error.statusCode);
      }
    );
  }
}
