import type { FastifyInstance } from "fastify";
import S from "fluent-json-schema";

type LoginBody = { username: string; password: string };
const LOGIN_SCHEMA = S.object()
    .prop("username", S.string().required())
    .prop("password", S.string().required());

const RESPONSE_SCHEMA = {
    200: S.object().prop("token", S.string().required()),
    "4xx": S.object().prop("error", S.string().required()),
};

export default async function postLogin(fastify: FastifyInstance) {
    fastify.log.info("attaching login plugin");

    fastify.post(
        "/login",
        { schema: { body: LOGIN_SCHEMA, response: RESPONSE_SCHEMA } },
        (request, reply) => {
            const { username, password } = request.body as LoginBody;

            request.log.info(
                `got username ${username} and password ${password}`
            );

            if (username === "Matt" && password === "password") {
                reply.send({ token: fastify.jwt.sign({ username }) });
            } else {
                reply
                    .status(401)
                    .send({ error: "username or password is incorrect" });
            }
        }
    );
}
