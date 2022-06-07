import sql from "@nearform/sql";
import type { FastifyInstance } from "fastify";
import { USER_INFO_LIST } from "../../types";

const schema = { response: { 200: USER_INFO_LIST } };

export default async function users(fastify: FastifyInstance) {
    fastify.log.info("Attaching users plugin");
    fastify.get("/", { schema }, async (request, reply) => {
        request.log.info("getting users");
        reply.send(
            await fastify.pg
                .query(sql`SELECT id, username FROM users;`)
                .then((r) => r.rows)
        );
    });
}
