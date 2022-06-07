import { FastifyInstance } from "fastify";
import S from "fluent-json-schema";

const schema = {
    response: { 200: S.object().prop("username", S.string().required()) },
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
