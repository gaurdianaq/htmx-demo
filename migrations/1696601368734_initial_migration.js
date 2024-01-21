function migrationFunction(migration, context) {
  const navbar = migration.createContentType("navbar");
  navbar.displayField("title").name("Navbar").description("");

  const navbarLogo = navbar.createField("logo");
  navbarLogo
    .name("Logo")
    .type("Link")
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType("Asset");

  const navbarTitle = navbar.createField("title");
  navbarTitle
    .name("Title")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([{ unique: true }])
    .disabled(false)
    .omitted(false);

  const navbarNavbarItems = navbar.createField("navbarItems");
  navbarNavbarItems
    .name("NavbarItems")
    .type("Array")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Link",
      validations: [{ linkContentType: ["navbarDropdown", "navbarLink"] }],
      linkType: "Entry",
    });
  navbar.changeFieldControl("logo", "builtin", "assetLinkEditor");
  navbar.changeFieldControl("title", "builtin", "singleLine");
  navbar.changeFieldControl("navbarItems", "builtin", "entryLinksEditor");

  const coffee = migration.createContentType("coffee");
  coffee.displayField("name").name("Coffee").description("");

  const coffeeName = coffee.createField("name");
  coffeeName
    .name("Name")
    .type("Symbol")
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  const coffeeRoast = coffee.createField("roast");
  coffeeRoast
    .name("Roast")
    .type("Symbol")
    .localized(true)
    .required(false)
    .validations([
      {
        in: [
          "Dark Roast",
          "Medium Roast",
          "Light Roast",
          "Torréfaction foncée",
          "Torréfaction moyenne",
          "Rôti léger",
        ],
      },
    ])
    .defaultValue({ "en-US": "Medium Roast", fr: "Torréfaction moyenne" })
    .disabled(false)
    .omitted(false);

  const coffeeDescription = coffee.createField("description");
  coffeeDescription
    .name("Description")
    .type("Text")
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  const coffeeImage = coffee.createField("image");
  coffeeImage
    .name("Image")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType("Asset");
  coffee.changeFieldControl("name", "builtin", "singleLine");
  coffee.changeFieldControl("roast", "builtin", "dropdown");
  coffee.changeFieldControl("description", "builtin", "markdown");
  coffee.changeFieldControl("image", "builtin", "assetLinkEditor");

  const navbarDropdown = migration.createContentType("navbarDropdown");
  navbarDropdown.displayField("label").name("Navbar Dropdown").description("");

  const navbarDropdownLabel = navbarDropdown.createField("label");
  navbarDropdownLabel
    .name("Label")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  const navbarDropdownNavbarLinks = navbarDropdown.createField("navbarLinks");
  navbarDropdownNavbarLinks
    .name("Navbar Links")
    .type("Array")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Link",
      validations: [{ linkContentType: ["navbarLink"] }],
      linkType: "Entry",
    });
  navbarDropdown.changeFieldControl("label", "builtin", "singleLine");
  navbarDropdown.changeFieldControl(
    "navbarLinks",
    "builtin",
    "entryLinksEditor"
  );

  const navbarLink = migration.createContentType("navbarLink");
  navbarLink.displayField("label").name("Navbar Link").description("");

  const navbarLinkLabel = navbarLink.createField("label");
  navbarLinkLabel
    .name("Label")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  const navbarLinkTarget = navbarLink.createField("target");
  navbarLinkTarget
    .name("Target")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  navbarLink.changeFieldControl("label", "builtin", "singleLine");
  navbarLink.changeFieldControl("target", "builtin", "singleLine");
}
module.exports = migrationFunction;
