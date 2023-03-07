export type Tier = {
  maxOffenses: number;
  discordGuildRuleId: number;
  ruleActionId: number;
  id: number;
}

export type TierBeforeCreate = {
  maxOffenses: number;
  discordGuildRuleId: number;
  ruleActionId: number;
}

export type TierUpdateResponse = {
  tier: Tier;
}

export type TierCreateResponse = {
  tier: Tier;
}

export type TierGetResponse = {
  tier: Tier[];
}

export type CreateTierRequest = {
  tier: TierBeforeCreate;
};

export type PatchTierRequest = {
  tier: TierBeforeCreate;
};