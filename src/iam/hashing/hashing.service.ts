import { Injectable } from "@nestjs/common";
import { genSalt, hash, compare } from "bcrypt";
import { Result, ResultAsync } from "neverthrow";
import { TAPIResponseMessage } from "@/types";
import { createResponseMessage } from "@/utils";

@Injectable()
export class HashingService {
  hash(data: string | Buffer): ResultAsync<string, TAPIResponseMessage> {
    return ResultAsync.fromPromise(genSalt(), (error) => {
      return createResponseMessage(500, error);
    }).andThen((salt) => {
      return ResultAsync.fromPromise(hash(data, salt), (error) => {
        return createResponseMessage(500, error);
      });
    });
  }
  compare(
    data: string | Buffer,
    encrypted: string
  ): ResultAsync<boolean, TAPIResponseMessage> {
    return ResultAsync.fromPromise(compare(data, encrypted), (error) => {
      return createResponseMessage(500, error);
    });
  }
}
