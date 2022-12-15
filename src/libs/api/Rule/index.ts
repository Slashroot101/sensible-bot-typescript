import {RulesListResponse, Rule} from '../../../types/Rule';
import Axios from "axios";
import logger from "../../logger/index";
import config from "../../config/index";
import {RuleAndRuleActionData} from '../../../types/Shared/RuleAndRuleActionData';
import {getRuleActions} from '../RuleAction/index';

export const getRuleList = async (): Promise<RulesListResponse> => {
  logger.info('Getting rule list with axios get');
  const { data } = await Axios.get(`${config.apiUrl}/rule/list`);

  return data;
};

const ruleAndActionData: RuleAndRuleActionData = {
  rules: [],
  ruleActions: [],
}

export const loadRuleData = async(): Promise<void> => {
  const rules = await getRuleList();
  const ruleActions = await getRuleActions();
  console.log(rules, ruleActions)
  ruleAndActionData.rules = rules.rules;
  ruleAndActionData.ruleActions = ruleActions.ruleActions;
};

export const getRuleData = (): RuleAndRuleActionData =>  {
  return ruleAndActionData;
};