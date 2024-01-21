import { User } from "../../users/users.schema";

export type LoginData = Pick<User, "userName" | "password">;
