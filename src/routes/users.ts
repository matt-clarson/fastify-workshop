import type { FastifyInstance } from "fastify";

export default async function users(fastify: FastifyInstance) {
    fastify.log.info("Attaching users plugin");
    fastify.get("/users", (request, reply) => {
        request.log.info("getting users");
        reply.send([
            { id: 1, user: "Matt" },
            { id: 2, user: "Clara" },
        ]);
    });
}
