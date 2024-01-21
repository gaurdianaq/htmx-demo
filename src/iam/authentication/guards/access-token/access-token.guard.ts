import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import jwtConfig from "src/iam/config/jwt.config";
import { Request } from "express";
import { ResultAsync, ok } from "neverthrow";
import { createResponseMessage } from "@/utils";
import { REQUEST_USER_KEY } from "src/iam/iam.constants";

//Guard to restrict acccess to anyone who is authenticated
@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const accessToken: string = request.cookies["accessToken"];
    if (accessToken === undefined) {
      return false;
    }

    return await ResultAsync.fromPromise(
      this.jwtService.verifyAsync<{ sub: number; email: string }>(
        accessToken,
        this.jwtConfiguration
      ),
      (error) => {
        return false;
      }
    )
      .andThen((payload) => {
        return ok(true);
      })
      .match(
        (result) => result,
        (resultError) => resultError
      );
  }
}
