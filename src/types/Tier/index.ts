import { Audit } from "../Shared/Audit";
import { Id } from "../Shared/Id";

export type Tier = {
  maxOffenses: string;
  discordGuildRuleId: string;
  ruleActionId: string;
  id: string;
}

export type TierBeforeCreate = {
  maxOffenses: string;
  discordGuildRuleId: string;
  ruleActionId: string;
}

export type TierUpdateResponse = {
  tier: Tier;
}

export type TierCreateResponse = {
  tier: Tier;
}

export type TierGetResponse = {
  tier: Tier;
}

export type CreateTierRequest = {
  tier: TierBeforeCreate;
};

export type PatchTierRequest = {
  tier: TierBeforeCreate;
};