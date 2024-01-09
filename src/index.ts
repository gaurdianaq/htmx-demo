import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { errAsync, okAsync } from "neverthrow";
import path from "node:path";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
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
