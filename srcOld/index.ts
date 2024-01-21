import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { errAsync, okAsync } from "neverthrow";
import path from "node:path";
import { NavItem, generateNavbar } from "./components/navbar";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
});

fastify.get("/navbar", async (request, reply) => {
  const mockNavData: NavItem[] = [
    {
      label: "Home",
      url: "/home",
    },
    {
      label: "Page 1",
      url: "/page1",
    },
    {
      label: "Page 2",
      url: "/page2",
    },
    {
      label: "Page 3",
      url: "/page3",
    },
    {
      label: "About Us",
      url: "/about",
    },
  ];

  reply
    .code(200)
    .header("Content-Type", "text/html")
    .send(generateNavbar(mockNavData));
});

const generateMockPage = (contentText: string) => {
  return `<div">
    ${contentText}
  </div>`;
};

fastify.get("/home", async (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "text/html")
    .send(
      generateMockPage(
        "This is the home page, you might even say it's a real homey page. I need to fill out some space on it but this should be ok for now."
      )
    );
});

fastify.get("/page1", async (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "text/html")
    .send(
      generateMockPage(
        "This is page 1, there isn't much content here right now but I'm still going to type my little heart out"
      )
    );
});

fastify.get("/page2", async (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "text/html")
    .send(
      generateMockPage(
        "This is page 2, whoever is reading this page of pages. I want to say, that you're awesome. And anyone who says otherwise deserves to be smacked upside the head. I think I might type some more text."
      )
    );
});

fastify.get("/page3", async (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "text/html")
    .send(
      generateMockPage(
        "This is page 3, nothing more needs to be said about it."
      )
    );
});

fastify.get("/about", async (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "text/html")
    .send(
      generateMockPage("There is nothing you need to know about us for now.")
    );
});

const startServer = async () => {
  try {
    //TODO assign port and URL and other things via config
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
