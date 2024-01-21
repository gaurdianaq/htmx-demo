import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

//Guard to restrict access to routes to only our own internal functions (or anywhere we give the key to)
@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.header("x-api-key") === process.env.X_API_KEY) {
      return true;
    }
    return false;
  }
}
