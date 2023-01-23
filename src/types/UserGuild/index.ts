export type UserGuildBeforeCreate = {
  discordGuildId: number;
  discordUserId: number;
  isAdmin: boolean;
}

export type UserGuildResponse = {
  userGuild: UserGuild;
}

export type UserGuild = {
  id: number;
  discordGuildId: number;
  discordUserId: number;
  isAdmin: boolean;
}