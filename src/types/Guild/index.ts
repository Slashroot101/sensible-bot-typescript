export type Guild =  {
  discordSnowflake: string;
  ticketCategoryId: string;
  ticketCreationChannelId: string;
  id: number;
}

export type GuildCreateRequest = {
  discordGuild: GuildBeforeCreate;
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

export type GuildTicketCategoryRequest = {
  ticketCategoryId: string;
}

export type GuildTicketChannelRequest = {
  ticketCreationChannelId: string;
}