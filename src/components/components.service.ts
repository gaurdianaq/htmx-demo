import { Injectable } from "@nestjs/common";
import { ContentfulService } from "src/contentful/contentful.service";
import { INavbarEntry, TNavItemEntry } from "@/componentContentfulTypes";
import { INavbarProps, TAPIResponseMessage, TDropDown } from "@/types";
import { createResponseMessage } from "@/utils";
import { ResultAsync, okAsync } from "neverthrow";
import { generateNavbar } from "./navbar";
import { CoffeesService } from "src/coffees/coffees.service";

@Injectable()
export class ComponentsService {
  constructor(
    private readonly contentfulService: ContentfulService,
    private readonly coffeeService: CoffeesService
  ) {}

  getComponentProps(componentId: string) {
    switch (componentId) {
      case "navbar":
        return this.getNavBar();
      case "home":
        console.log(this.getHome());
        return okAsync(this.getHome());
      case "secret":
        return okAsync(this.getSecret());
    }
  }

  private getHome() {
    return `<p>This is the home page, try pressing space for a secret</p>
    <div hx-get="/components/secret" hx-trigger="keydown[keyCode==32] from:body" id="secretbox"></div>`;
  }

  private getSecret() {
    return `<div class="secretclass" hx-on:mouseenter="changeSecretColour()">Try hovering for a surprise!</div>`;
  }

  //TODO figure out how to get the typing of this working as expected
  private getNavBar(
    navbarTitle: string = "MainNav"
  ): ResultAsync<string, TAPIResponseMessage> {
    return this.contentfulService
      .getEntries<INavbarEntry>({
        content_type: "navbar",
        "fields.title": navbarTitle,
        include: 2,
      })
      .andThen((entries) => {
        return okAsync({
          navbarItems: entries.items[0].fields.navbarItems.map(
            (navItem: TNavItemEntry) => {
              if ("navbarLinks" in navItem.fields) {
                return {
                  label: navItem.fields.label,
                  navbarLinks: navItem.fields.navbarLinks.map((navBarLink) => {
                    return navBarLink.fields;
                  }),
                } as TDropDown;
              }
              return navItem.fields;
            }
          ),
        } as INavbarProps);
      })
      .andThen((navbarProps) => {
        return this.coffeeService.getCoffeeNavBarLinks().map((dropDowns) => {
          navbarProps.navbarItems = navbarProps.navbarItems.concat(dropDowns);
          return generateNavbar(navbarProps);
        });
      });
  }
}
