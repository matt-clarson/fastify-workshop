import { fastify } from "fastify";

export default function buildServer() {
    const server = fastify({
        logger: { prettyPrint: process.env.NODE_ENV === "development" },
    });

    server.get("/", (_request, reply) => {
        reply.send({ hello: "world" });
    });

    server.register(import("./routes/users.js"));
    server.register(import("./routes/login.js"));

    server.log.info("Starting...");

    return server;
}
