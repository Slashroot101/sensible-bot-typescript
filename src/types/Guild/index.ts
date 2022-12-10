import { Audit } from "../Shared/Audit";
import { Id } from "../Shared/Id";

export type Guild =  {
  discordSnowflake: string;
  id: Id;
  audit: Audit;
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