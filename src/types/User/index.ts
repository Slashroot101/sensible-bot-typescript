

export type User = {
  discordSnowflake: string;
  id: string;
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