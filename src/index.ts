import { fastify } from "fastify";

export default function buildServer() {
    const server = fastify({
        logger: { prettyPrint: process.env.NODE_ENV === "development" },
    });

    server.get("/", (_request, reply) => {
        reply.send({ hello: "world" });
    });

    server.register(import("./routes/users"));
    server.register(import("./routes/login"));

    server.log.info("Starting...");

    return server;
}
