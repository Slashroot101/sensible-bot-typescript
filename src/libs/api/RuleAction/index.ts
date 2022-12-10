import Axios from "axios";
import logger from "../../logger/index";
import config from "../../config/index";
import { RuleActionListResponse } from "../../../types/RuleAction";

export const getRuleActions = async (): Promise<RuleActionListResponse> => {
  logger.info('Getting rule actions with Axios get');
  const {data} = await Axios.get(`${config.apiUrl}/rule-action/list`);

  return data;
};