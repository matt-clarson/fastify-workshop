import { fastify } from "fastify";

export default function buildServer() {
    const server = fastify({ logger: true });

    server.get("/", (_request, reply) => {
        reply.send({ hello: "world" });
    });

    server.register(import("./routes/users.js"));

    return server;
}
