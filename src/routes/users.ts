import type { FastifyInstance } from "fastify";

export default async function users(fastify: FastifyInstance) {
    fastify.get("/users", (_request, reply) => {
        reply.send([
            { id: 1, user: "Matt" },
            { id: 2, user: "Clara" },
        ]);
    });
}
