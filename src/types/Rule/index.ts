import { Audit } from "../Shared/Audit";
import { Id } from "../Shared/Id";

export type Rule = {
  name: string;
  id: Id;
  audit: Audit;
}

export type RulesListResponse = {
  rules: Rule[];
}