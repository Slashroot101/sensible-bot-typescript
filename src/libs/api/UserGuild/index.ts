import Axios from "axios";
import logger from "../../logger/index";
import config from "../../config/index";
import { UserGuild, UserGuildBeforeCreate, UserGuildResponse } from "../../../types/UserGuild";

export const createUserGuild = async function (request: UserGuildBeforeCreate): Promise<UserGuild>{
  logger.info(`Creating user guild [discordUserId=${request.discordUserId}]/[discordGuildId=${request.discordGuildId}]`);

  const {data} = await Axios.post<UserGuild>(`${config.apiUrl}/user-guilds/`, request);

  return data;
}

export const getUserGuild = async function(discordGuildId: number, discordUserId: number): Promise<UserGuild> {
  logger.info(`Getting user guild [discordUserId=${discordUserId}]/[discordGuildId=${discordGuildId}]`);

  const {data} = await Axios.get<UserGuildResponse>(`${config.apiUrl}/user-guilds/discord-user/${discordUserId}/discord-guild/${discordGuildId}`);

  return data.userGuild;
}

export const getUserGuildById = async function(userGuildId: number): Promise<UserGuild> {
  logger.debug(`Getting user guild by [userGuildID=${userGuildId}]`);

  const {data} = await Axios.get<UserGuildResponse>(`${config.apiUrl}/user-guilds/${userGuildId}`);

  return data.userGuild;
}