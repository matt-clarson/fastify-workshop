import { fastify } from "fastify";

const app = fastify({ logger: true });

app.get("/", (_request, reply) => {
    reply.send({ hello: "world" });
});

app.listen(3000, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});
