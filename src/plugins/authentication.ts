import {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    onRequestHookHandler,
} from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
    interface FastifyInstance {
        authenticate: onRequestHookHandler;
    }
}

async function authentication(
    fastify: FastifyInstance,
    opts: { secret: string }
) {
    fastify.register(import("@fastify/jwt"), { secret: opts.secret });

    fastify.decorate(
        "authenticate",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify();
            } catch (err) {
                request.log.warn(err);
                reply.send(err);
            }
        }
    );
}

export default fp(authentication);
