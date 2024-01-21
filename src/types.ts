import { Document } from "@contentful/rich-text-types";

export type TAPIResponseMessage = {
  statusCode: number;
  message: string | object;
};

export type TLink = {
  label: string;
  target: string;
};

export type TDropDown = {
  label: string;
  navbarLinks: TLink[];
};

export type TNavItem = TLink | TDropDown;

export interface INavbarProps {
  title: string;
  logoSrc?: string; //Image source for logo
  navbarItems?: TNavItem[];
}

export interface ICoffeeBrand {
  name: string;
  description: Document;
  shortDescription: string;
}

export interface ICoffee {
  name: string;
  roast: string;
  richTextDescription: Document; //need to figure out what to type this as, there seems to be a document type, but it's not exported
  shortDescription: string;
  brand: ICoffeeBrand;
}

export type TCoffeeHit = Omit<ICoffee, "richTextDescription" | "brand"> & {
  objectID: string;
  brand: string;
};
