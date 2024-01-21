import { Inject, Injectable } from "@nestjs/common";
import { NewUser, User } from "src/users/users.schema";
import { UsersService } from "src/users/users.service";
import { HashingService } from "../hashing/hashing.service";
import { ResultAsync, err, errAsync, ok } from "neverthrow";
import { createResponseMessage } from "@/utils";
import { LoginData } from "./authentication.types";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { TAPIResponseMessage } from "@/types";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) // 👈
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  signUp(newUser: NewUser) {
    return this.hashingService
      .hash(newUser.password)
      .andThen((hashedPassword) => {
        return this.userService.insertUser({
          email: newUser.email,
          userName: newUser.userName,
          password: hashedPassword,
        });
      });
  }

  signIn(
    loginData: LoginData
  ): ResultAsync<
    { accessToken: string; refreshToken: string },
    TAPIResponseMessage
  > {
    return this.userService.getUser(loginData.userName).andThen((user) => {
      return this.hashingService
        .compare(loginData.password, user.password)
        .andThen((isEqual) => {
          if (isEqual) {
            return this.generateTokens(user);
          }
          return err(
            createResponseMessage(
              401,
              "Invalid credentials, please check your username/password"
            )
          );
        });
    });
  }

  private signtoken<T>(userId: number, expiresIn: number, payload?: T) {
    return ResultAsync.fromPromise(
      this.jwtService.signAsync(
        {
          sub: userId,
          ...payload,
        },
        {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
          expiresIn,
        }
      ),
      (error) => {
        return createResponseMessage(500, error);
      }
    );
  }

  generateTokens(user: User) {
    return ResultAsync.combine([
      this.signtoken(user.id, this.jwtConfiguration.accessTokenTtl, {
        userName: user.userName,
        email: user.email,
      }),
      this.signtoken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]).map(([accessToken, refreshToken]) => {
      return {
        accessToken,
        refreshToken,
      };
    });
  }

  refreshTokens(refreshToken: string) {
    if (
      refreshToken.length === 0 ||
      refreshToken === undefined ||
      refreshToken === null
    ) {
      return errAsync(createResponseMessage(401, "No refresh token provided"));
    }
    return ResultAsync.fromPromise(
      this.jwtService.verifyAsync<{ userName: string }>(refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      }),
      (error) => {
        return createResponseMessage(401, error);
      }
    )
      .andThen((result) => {
        return this.userService.getUser(result.userName);
      })
      .andThen((user) => {
        return this.generateTokens(user);
      });
  }
}
