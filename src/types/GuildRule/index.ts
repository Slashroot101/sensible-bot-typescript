import { Audit } from "../Shared/Audit";
import { Id } from "../Shared/Id";

export type GuildRule = {
  discordGuildId: string;
  ruleId: string;
  ruleActionId: string;
  enabled: boolean;
  id: Id;
  audit: Audit;
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
  ruleActionId: string;
  enabled: boolean;
  discordGuildId: string;
  ruleId: string;
}