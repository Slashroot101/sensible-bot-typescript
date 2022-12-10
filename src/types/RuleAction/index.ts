import { Audit } from "../Shared/Audit";
import { Id } from "../Shared/Id";

export type RuleAction = {
  name: string;
  id: Id;
  audit: Audit;
}

export type RuleActionListResponse = {
  ruleActions: RuleAction[];
}