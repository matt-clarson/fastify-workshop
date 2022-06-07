import type { FastifyInstance } from "fastify";
import S from "fluent-json-schema";
import sql from "@nearform/sql";

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
        async (request, reply) => {
            const { username, password } = request.body as LoginBody;

            request.log.info(
                `got username ${username} and password ${password}`
            );

            const q = await fastify.pg.query(
                sql`SELECT username, password FROM users WHERE username=${username};`
            );
            if (q.rowCount !== 1) {
                reply
                    .status(401)
                    .send({ error: "username or password is incorrect" });
                return;
            }

            request.log.info(q.rows);
            const [userInfo] = q.rows;

            if (password === userInfo.password) {
                reply.send({ token: fastify.jwt.sign({ username }) });
            } else {
                reply
                    .status(401)
                    .send({ error: "username or password is incorrect" });
            }
        }
    );
}
