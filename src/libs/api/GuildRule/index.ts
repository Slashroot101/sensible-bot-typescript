import Axios from "axios";
import logger from "../../logger/index";
import config from "../../config/index";
import { GuildRuleUpsertResponse, GuildRuleUpsertRequest, GuildRuleQueryResponse } from "../../../types/GuildRule";

export const updateGuildRule = async (guildId: string, ruleId: string, props: GuildRuleUpsertRequest): Promise<GuildRuleUpsertResponse> => {
  logger.info(`Creating patch request to configStore for discordGuildId=${guildId} and props ${props}`);
  const { data } = await Axios.patch(`${config.apiUrl}/config-store/discord-guild/${guildId}/rule/${ruleId}`, {...props});

  return data;
}

export const getDiscordRuleByRuleAction = async (ruleId: string, actionId: string): Promise<GuildRuleQueryResponse> => {
  logger.info(`Fetching discord guild rules for [ruleId=${ruleId}]/[actionId=${actionId}]`);
  const { data } = await Axios.get(`${config.apiUrl}/config-store/rule/${ruleId}/action/${actionId}`);

  return data;
}