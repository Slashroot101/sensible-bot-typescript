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

export type WarningCreateResponse = {
  warning: Warning;
}

export type WarningPatchResponse = {
  warning: Warning;
}

export type WarningListResponse = {
  warnings: Warning[];
}

export type GetQueryRequest = {
  discordUserId: string;
}