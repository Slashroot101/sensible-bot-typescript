import Axios from "axios";
import logger from "../../logger/index";
import config from "../../config/index";
import { GuildCreateRequest, GuildCreateResponse, GuildQueryRequest, GuildQueryResponse } from "../../../types/Guild";

export const createGuild = async (request: GuildCreateRequest): Promise<GuildCreateResponse> => {
  logger.info(`Creating guild with axios post for guild for [guildId=${request.guild.discordSnowflake}]`);
  const { data } = await Axios.post<GuildCreateResponse>(`${config.apiUrl}/discord-guild`, {...request.guild});

  return data;
}

export const getGuild = async (request: GuildQueryRequest): Promise<GuildQueryResponse> => {
  logger.info(`Getting guild with axios get for guild [guildId=${request.discordSnowflake}]`);
  const { data } = await Axios.get<GuildQueryResponse>(`${config.apiUrl}/discord-guild`, {params: request});

  return data;
}