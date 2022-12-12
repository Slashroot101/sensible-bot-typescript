import { GuildRuleWithRelations } from "../GuildRule";

export type Warning = {
  expunged: boolean;
  discordGuildRuleId: string;
  messageId: string;
  discordUserId: string;
  expungedBy: string;
  id: string;
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