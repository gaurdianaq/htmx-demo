import { TAPIResponseMessage } from "./types";

export const createResponseMessage = (
    statusCode: number,
    message: unknown
  ): TAPIResponseMessage => {
    return {
      statusCode,
      message: message as string | object, //unsure how better to handle this, often the error type returned from the fromPromise function is unknown
    };
  };
  