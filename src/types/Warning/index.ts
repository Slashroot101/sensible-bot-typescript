import { GuildRuleWithRelations } from "../GuildRule";

export type Warning = {
  isExpunged: boolean;
  discordGuildRuleId: string;
  messageId: string;
  discordUserId: string;
  expungedBy: string;
  id: string;
}

export type PatchExpungeWarning = {
  isExpunged: boolean;
}

export type WarningWithRelations = {
  isExpunged: boolean;
  messageId: string;
  discordUserId: string;
  expungedBy: string;
  discordGuildRule: GuildRuleWithRelations;
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
  discordUserId: number;
}