import { fastify } from "fastify";
import autoload from "@fastify/autoload";
import path from "node:path";
import type { Config } from "../config";

export default function buildServer(config: Config) {
    const server = fastify({
        logger: { prettyPrint: config.NODE_ENV === "development" },
    });

    server.register(import("@fastify/postgres"), {
        connectionString: config.PG_CONNECTION_STRING,
    });
    server.register(autoload, {
        dir: path.join(__dirname, "./plugins"),
        options: { secret: config.SECRET },
    });

    server.register(autoload, {
        dir: path.join(__dirname, "./routes"),
    });

    server.log.info("Starting...");

    return server;
}
