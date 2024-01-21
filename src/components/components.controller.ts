import {
  Controller,
  Get,
  HttpException,
  Param,
  UseGuards,
  Req,
} from "@nestjs/common";
import { ComponentsService } from "./components.service";
import { INavbarProps, TAPIResponseMessage } from "@/types";
import { ApiKeyGuard } from "src/common/api-key/api-key.guard";
import { Request } from "express";

@Controller("components")
@UseGuards(ApiKeyGuard)
export class ComponentsController {
  constructor(private readonly componentService: ComponentsService) {}

  @Get(":id")
  async getComponent(@Param("id") id: string, @Req() request: Request) {
    console.log(request.cookies);
    return await this.componentService
      .getComponentProps(id)
      .match<INavbarProps>(
        (props) => {
          return props;
        },
        (error) => {
          throw new HttpException(error.message, error.statusCode);
        }
      );
  }
}
