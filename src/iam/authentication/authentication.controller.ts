import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { NewUser } from "src/users/users.schema";
import { LoginData } from "./authentication.types";
import { AuthenticationService } from "./authentication.service";
import { Response } from "express";

@Controller("authentication")
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post("sign-up")
  signUp(@Body() newUser: NewUser) {
    return this.authService.signUp(newUser).match(
      () => {
        return {
          message: "User successfully signed up",
        };
      },
      (error) => {
        throw new HttpException(error.message, error.statusCode);
      }
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() loginData: LoginData
  ) {
    return this.authService.signIn(loginData).match(
      (token) => {
        return {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        };
      },
      (error) => {
        throw new HttpException(error.message, error.statusCode);
      }
    );
  }

  @HttpCode(HttpStatus.OK) // changed since the default is 201
  @Post("refresh-tokens")
  refreshTokens(@Body() body: { refreshTokenDto: string }) {
    return this.authService.refreshTokens(body.refreshTokenDto).match(
      (tokens) => {
        return tokens;
      },
      (error) => {
        throw new UnauthorizedException();
      }
    );
  }
}
