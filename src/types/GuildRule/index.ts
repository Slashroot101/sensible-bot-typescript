import { Rule } from "../Rule";

export type GuildRule = {
  discordGuildId: string;
  ruleId: string;
  ruleActionId?: string;
  enabled: boolean;
  id: string;
}

export type GuildRuleWithRelations = {
  Rule: Rule;
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
  ruleActionId?: string;
  enabled: boolean;
  discordGuildId: string;
  ruleId: string;
}