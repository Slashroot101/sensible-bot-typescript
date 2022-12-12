export type Guild =  {
  discordSnowflake: string;
  id: string;
}

export type GuildCreateRequest = {
  guild: GuildBeforeCreate;
}

export type GuildBeforeCreate = {
  discordSnowflake: string;
}

export type GuildCreateResponse = {
  discordGuild: Guild;
}

export type GuildQueryResponse = {
  discordGuilds: Guild[];
}

export type GuildQueryRequest = {
  discordSnowflake: string;
}