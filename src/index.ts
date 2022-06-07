import { fastify } from "fastify";
import type { Config } from "../config";

export default function buildServer(config: Config) {
    const server = fastify({
        logger: { prettyPrint: config.NODE_ENV === "development" },
    });

    server.get("/", (_request, reply) => {
        reply.send({ hello: "world" });
    });

    server.register(import("@fastify/jwt"), { secret: config.SECRET });
    server.register(import("./routes/users"));
    server.register(import("./routes/login"));

    server.log.info("Starting...");

    return server;
}
