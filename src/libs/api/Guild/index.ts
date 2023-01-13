import Axios from "axios";
import logger from "../../logger/index";
import config from "../../config/index";
import { GuildCreateRequest, GuildCreateResponse, GuildQueryRequest, GuildQueryResponse, GuildTicketCategoryRequest, GuildTicketChannelRequest } from "../../../types/Guild";

export const createGuild = async (request: GuildCreateRequest): Promise<GuildCreateResponse> => {
  logger.info(`Creating guild with axios post for guild for [guildId=${request.discordGuild.discordSnowflake}]`);
  const { data } = await Axios.post<GuildCreateResponse>(`${config.apiUrl}/discord-guild`, {...request.discordGuild});

  return data;
}

export const getGuild = async (request: GuildQueryRequest): Promise<GuildQueryResponse> => {
  logger.info(`Getting guild with axios get for guild [guildId=${request.discordSnowflake}]`);
  const { data } = await Axios.get<GuildQueryResponse>(`${config.apiUrl}/discord-guild`, {params: request});

  return data;
}

export const setTicketCategory = async (request: GuildTicketCategoryRequest, guildId: number): Promise<GuildCreateRequest> => {
  logger.info(`Setting ticket category for [guildId=${guildId}] to be [ticketCategoryId=${request.ticketCategoryId}]`);

  const { data } = await Axios.put<GuildCreateRequest>(`${config.apiUrl}/discord-guild/${guildId}/ticket-category`, request);

  return data;
};

export const setTicketCreationChannel = async (request: GuildTicketChannelRequest, guildId: number): Promise<GuildCreateRequest> => {
  logger.info(`Setting ticket channel for [guildId=${guildId}] to be [ticketCreationChannelId=${request.ticketCreationChannelId}]`);

  const { data } = await Axios.put<GuildCreateRequest>(`${config.apiUrl}/discord-guild/${guildId}/creation-channel`, request);

  return data;
};