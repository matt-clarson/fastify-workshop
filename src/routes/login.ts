import type { FastifyInstance } from "fastify";
import { default as S } from "fluent-json-schema";

type LoginBody = { username: string; password: string };
const LOGIN_SCHEMA = S.object()
    .prop("username", S.string().required())
    .prop("password", S.string().required());

export default async function postLogin(fastify: FastifyInstance) {
    fastify.log.info("attaching login plugin");

    fastify.post(
        "/login",
        { schema: { body: LOGIN_SCHEMA } },
        (request, reply) => {
            const { username, password } = request.body as LoginBody;

            request.log.info(
                `got username ${username} and password ${password}`
            );

            reply.send({ username, password });
        }
    );
}