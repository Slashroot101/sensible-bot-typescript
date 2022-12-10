import { Audit } from "../Shared/Audit";
import { Id } from "../Shared/Id";

export type User = {
  discordSnowflake: string;
  id: Id;
  audit: Audit;
}

export type CreateUserResponse = {
  discordUser: User;
}

export type UpdateUserResponse = {
  discordUser: User;
}

export type GetUserResponse = {
  discordUsers: User[];
}

export type CreateUserRequest = {
  discordUser: DiscordUserBeforeCreate;
}

export type DiscordUserBeforeCreate = {
  discordSnowflake: string;
}

export type GetUserRequest = {
  discordSnowflake: string;
}