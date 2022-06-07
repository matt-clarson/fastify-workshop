import buildServer from "./src/index.js";

const server = buildServer();

try {
    await server.listen(3000);
} catch (err) {
    server.log.error(err);
    process.exit(1);
}
