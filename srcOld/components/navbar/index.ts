export interface NavItem {
  label: string;
  url: string;
}

const generateNavItem = (navItem: NavItem) => {
  return `<li hx-get="${navItem.url}" hx-target="#main-content">
        ${navItem.label}
    </li>`;
};

export const generateNavbar = (navItems: NavItem[]) => {
  return `<ul class="nav">
        ${navItems.map((navItem) => generateNavItem(navItem))}
    </ul>`;
};
