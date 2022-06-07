import buildServer from "./src/index";
import config from "./config";

const server = buildServer(config);

async function start() {
    try {
        await server.listen(config.PORT);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();
