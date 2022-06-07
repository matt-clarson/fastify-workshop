import type { FastifyInstance } from "fastify";
import sql from "@nearform/sql";
import {
    ERROR_RESPONSE,
    TOKEN_OBJ,
    User,
    UserInfo,
    UserLogin,
    USER_LOGIN,
} from "../types";

const schema = {
    body: USER_LOGIN,
    response: { 200: TOKEN_OBJ, "4xx": ERROR_RESPONSE },
};

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: UserInfo;
        user: UserInfo;
    }
}

export default async function postLogin(fastify: FastifyInstance) {
    fastify.log.info("attaching login plugin");

    fastify.post("/login", { schema }, async (request, reply) => {
        const { username, password } = request.body as UserLogin;

        request.log.info(`got username ${username} and password ${password}`);

        const q = await fastify.pg.query<User>(
            sql`SELECT * FROM users WHERE username=${username};`
        );
        if (q.rowCount !== 1) {
            reply
                .status(401)
                .send({ error: "username or password is incorrect" });
            return;
        }

        const [userInfo] = q.rows;

        if (password === userInfo.password) {
            reply.send({
                token: fastify.jwt.sign({
                    id: userInfo.id,
                    username: userInfo.username,
                }),
            });
        } else {
            reply
                .status(401)
                .send({ error: "username or password is incorrect" });
        }
    });
}
