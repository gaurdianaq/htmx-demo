import { ICoffee, ICoffeeBrand, TLink, INavbarProps } from "./types";
import { Entry } from "./contentfulTypes";

export interface ILinkEntry extends Entry<TLink> {}

export interface IDropDownEntry
  extends Entry<{
    label: string;
    navbarLinks: ILinkEntry[];
  }> {}

export type TNavItemEntry = ILinkEntry | IDropDownEntry;

export interface INavbarEntry extends Omit<INavbarProps, "navbarItems"> {
  navbarItems: TNavItemEntry[];
}

export interface ICoffeeEntry extends Omit<ICoffee, "brand"> {
  brand: ICoffeeBrandEntry;
}

export interface ICoffeeBrandEntry extends Entry<ICoffeeBrand> {}
