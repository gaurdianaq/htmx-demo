import {
  Controller,
  Get,
  HttpException,
  Param,
  UseGuards,
  Req,
} from "@nestjs/common";
import { ComponentsService } from "./components.service";
import { Request } from "express";

@Controller("components")
export class ComponentsController {
  constructor(private readonly componentService: ComponentsService) {}

  @Get(":id")
  async getComponent(@Param("id") id: string, @Req() request: Request) {
    console.log(request.cookies);
    return await this.componentService.getComponentProps(id).match<string>(
      (component) => {
        return component;
      },
      (error) => {
        throw new HttpException(error.message, error.statusCode);
      }
    );
  }
}
