import S from "fluent-json-schema";
import sql from "@nearform/sql";
import type { FastifyInstance } from "fastify";

const USERS_SCHEMA = S.array().items(
    S.object()
        .prop("id", S.number().required())
        .prop("username", S.string().required())
);

export default async function users(fastify: FastifyInstance) {
    fastify.log.info("Attaching users plugin");
    fastify.get(
        "/",
        { schema: { response: { 200: USERS_SCHEMA } } },
        async (request, reply) => {
            request.log.info("getting users");
            reply.send(
                await fastify.pg
                    .query(sql`SELECT id, username FROM users;`)
                    .then((r) => r.rows)
            );
        }
    );
}
