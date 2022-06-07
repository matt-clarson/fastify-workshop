import envSchema from "env-schema";
import S from "fluent-json-schema";

const ENV_SCHEMA = S.object()
    .prop("PORT", S.number().default(3000))
    .prop("SECRET", S.string().required())
    .prop("NODE_ENV", S.string().default("production"))
    .prop("PG_CONNECTION_STRING", S.string().required());

export type Config = {
    PORT: number;
    SECRET: string;
    NODE_ENV: string;
    PG_CONNECTION_STRING: string;
};

export default envSchema<Config>({
    schema: ENV_SCHEMA,
    dotenv: true,
});
