import buildServer from "./src/index";

const server = buildServer();

async function start() {
    try {
        await server.listen(3000);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();
