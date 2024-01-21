import { registerAs } from "@nestjs/config";
import { CreateClientParams } from "contentful";

export default registerAs("contentful", (): CreateClientParams => {
  return {
    space: process.env.CONTENTFUL_SPACE,
    environment: process.env.CONTENTFUL_ENV,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  };
});
