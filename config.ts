import envSchema from "env-schema";
import { Type, Static } from "@sinclair/typebox";

const ENV_SCHEMA = Type.Object({
    PORT: Type.Number({ default: 3000 }),
    SECRET: Type.String(),
    NODE_ENV: Type.String({ default: "production" }),
    PG_CONNECTION_STRING: Type.String(),
});

// const ENV_SCHEMA = S.object()
//     .prop("PORT", S.number().default(3000))
//     .prop("SECRET", S.string().required())
//     .prop("NODE_ENV", S.string().default("production"))
//     .prop("PG_CONNECTION_STRING", S.string().required());

// export type Config = {
//     PORT: number;
//     SECRET: string;
//     NODE_ENV: string;
//     PG_CONNECTION_STRING: string;
// };
export type Config = Static<typeof ENV_SCHEMA>;

export default envSchema<Config>({
    schema: Type.Strict(ENV_SCHEMA),
    dotenv: true,
});
