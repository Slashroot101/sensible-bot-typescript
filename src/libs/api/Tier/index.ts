import Axios from "axios";
import logger from "../../logger/index";
import config from "../../config/index";
import { CreateTierRequest, PatchTierRequest, TierCreateResponse, TierGetResponse, TierUpdateResponse } from "../../../types/Tier";

export const createTier = async (props: CreateTierRequest): Promise<TierCreateResponse> => {
  logger.info(`Creating new rule for [discordGuildRuleId=${props.tier.discordGuildRuleId}]`);
  const createdTier = await Axios.post<TierCreateResponse>(`${config.apiUrl}/guild-rule-action/`, {...props.tier});

  return createdTier.data;
};

export const patchTier = async (tierId: string, props: PatchTierRequest): Promise<TierUpdateResponse> => {
  logger.info(`Patching tier [tierId=${tierId}]`);
  const patchedTier = await Axios.patch<TierUpdateResponse>(`${config.apiUrl}/guild-rule-action/${tierId}`, {...props.tier});

  return patchedTier.data;
};

export const getTier = async (actionId: string, guildRuleId: string): Promise<TierGetResponse> => {
  logger.info(`Getting tier with [actionId=${actionId}]/[guildRuleId=${guildRuleId}]`);
  const tier = await Axios.get<TierGetResponse>(`${config.apiUrl}/guild-rule-action/guild-rule/${guildRuleId}/action/${actionId}`);

  return tier.data;
};