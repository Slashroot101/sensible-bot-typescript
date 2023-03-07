import { Rule } from "../Rule";

export type GuildRule = {
  discordGuildId: number;
  ruleId: number;
  ruleActionId?: number;
  enabled: boolean;
  id: number;
}

export type GuildRuleWithRelations = {
  rule: Rule;
}

export type GuildRuleUpsertResponse = {
  discordGuildRule: GuildRule;
}

export type GuildRuleQueryResponse = {
  discordGuildRule: GuildRule;
}

export type GuildRuleUpsertRequest = {
  rule: GuildRuleBeforeCreate;
}

export type GuildRuleBeforeCreate = {
  ruleActionId?: number;
  enabled: boolean;
  discordGuildId: number;
  ruleId: number;
}