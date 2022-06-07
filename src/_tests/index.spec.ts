import tap from "tap";
import buildServer from "../index";

tap.test("GET /user", async (t) => {
    const server = buildServer({
        PORT: 3000,
        SECRET: "testsecret",
        NODE_ENV: "development",
    });

    const response = await server.inject({ method: "GET", url: "/users" });

    t.equal(response.statusCode, 200);
    t.same(response.json(), [
        { id: 1, user: "Matt" },
        { id: 2, user: "Clara" },
    ]);
});
