import { Controller, Get, Res } from "@nestjs/common";
import { type Response } from "express";

@Controller()
export class AppController {
  @Get()
  root(@Res() res: Response) {
    res.sendFile("index.html");
  }
}
