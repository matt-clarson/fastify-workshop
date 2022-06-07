import { Type, Static } from "@sinclair/typebox";

export const USER = Type.Object({
    id: Type.Number(),
    username: Type.String(),
    password: Type.String(),
});
export type User = Static<typeof USER>;

export const USER_LOGIN = Type.Pick(USER, ["username", "password"]);
export type UserLogin = Static<typeof USER_LOGIN>;

export const USER_INFO = Type.Pick(USER, ["id", "username"]);
export type UserInfo = Static<typeof USER_INFO>;

export const USER_INFO_LIST = Type.Array(USER_INFO);

export const TOKEN_OBJ = Type.Object({ token: Type.String() });
export type TokenObj = Static<typeof TOKEN_OBJ>;

export const ERROR_RESPONSE = Type.Object({ error: Type.String() });
export type ErrorResponse = Static<typeof ERROR_RESPONSE>;
