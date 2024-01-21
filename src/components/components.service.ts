import { Injectable } from "@nestjs/common";
import { ContentfulService } from "src/contentful/contentful.service";
import { INavbarEntry, TNavItemEntry } from "@/componentContentfulTypes";
import { INavbarProps, TAPIResponseMessage, TDropDown } from "@/types";
import { createResponseMessage } from "@/utils";
import { ResultAsync, okAsync } from "neverthrow";

@Injectable()
export class ComponentsService {
  constructor(private readonly contentfulService: ContentfulService) {}

  getComponentProps(componentId: string) {
    switch (componentId) {
      case "navbar":
        return this.getNavbarProps();
    }
  }

  //TODO figure out how to get the typing of this working as expected
  private getNavbarProps(
    navbarTitle: string = "MainNav"
  ): ResultAsync<INavbarProps, TAPIResponseMessage> {
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
      });
  }
}
