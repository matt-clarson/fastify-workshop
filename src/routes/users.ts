import S from "fluent-json-schema";
import type { FastifyInstance } from "fastify";

const USERS_SCHEMA = S.array().items(
    S.object()
        .prop("id", S.number().required())
        .prop("user", S.string().required())
);

export default async function users(fastify: FastifyInstance) {
    fastify.log.info("Attaching users plugin");
    fastify.get(
        "/users",
        { schema: { response: { 200: USERS_SCHEMA } } },
        (request, reply) => {
            request.log.info("getting users");
            reply.send([
                { id: 1, user: "Matt" },
                { id: 2, user: "Clara" },
            ]);
        }
    );
}
