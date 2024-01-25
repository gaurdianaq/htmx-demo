import { INavbarProps, TDropDown, TLink } from "@/types";

const generateNavItem = (navItem: TLink) => {
  return `<a class="navbar-item" hx-get="${navItem.target}" hx-target="#main-content">
        ${navItem.label}
    </a>`;
};

const generateDropDownNavItem = (navDropdownItem: TDropDown) => {
  let navItems = "";
  navDropdownItem.navbarLinks.forEach((link) => {
    navItems += `<a
          class="navbar-item"
          hx-target="#main-content"
          hx-get=${link.target}
        >
          ${link.label}
        </a>\n`;
  });
  return `<div class="navbar-item has-dropdown is-hoverable">
  <div class="navbar-item">${navDropdownItem.label}</div>
  <div class="navbar-dropdown">
    ${navItems}
  </div>
</div>`;
};

export const generateNavbar = (navbar: INavbarProps) => {
  let navBarString = "";

  navbar.navbarItems.forEach((navItem) => {
    if ("navbarLinks" in navItem) {
      navBarString += `${generateDropDownNavItem(navItem)}\n`;
    } else {
      navBarString += `${generateNavItem(navItem)}\n`;
    }
  });

  return `<div class="nav">
      <div class="navbar-start">${navBarString}</div>     
    </div>`;
};
