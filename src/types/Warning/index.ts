import { GuildRule, GuildRuleWithRelations } from "../GuildRule";
import { Audit } from "../Shared/Audit";
import { Id } from "../Shared/Id";

export type Warning = {
  expunged: boolean;
  discordGuildRuleId: string;
  messageId: string;
  discordUserId: string;
  expungedBy: string;
  id: Id;
  audit: Audit;
}

export type WarningWithRelations = {
  expunged: boolean;
  messageId: string;
  discordUserId: string;
  expungedBy: string;
  DiscordGuildRule: GuildRuleWithRelations;
  id: string;
}

export type WarningCreateResponse = {
  warning: Warning;
}

export type WarningPatchResponse = {
  warning: Warning;
}

export type WarningListResponse = {
  warnings: WarningWithRelations[];
}

export type GetQueryRequest = {
  discordUserId: string;
}