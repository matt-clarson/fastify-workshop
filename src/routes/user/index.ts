import { FastifyInstance } from "fastify";
import { USER_INFO } from "../../types";

const schema = {
    response: { 200: USER_INFO },
};

export default async function user(fastify: FastifyInstance) {
    fastify.get(
        "/",
        { schema, onRequest: [fastify.authenticate] },
        (request, reply) => {
            reply.send(request.user);
        }
    );
}
