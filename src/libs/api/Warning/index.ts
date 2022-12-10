import Axios from "axios";
import logger from "../../logger/index";
import config from "../../config/index";
import { GetQueryRequest, WarningListResponse } from "../../../types/Warning";

export const queryWarnings = async (props: GetQueryRequest): Promise<WarningListResponse> => {
  logger.info(`Querying for user warnings for user [discordUserId=${props.discordUserId}]`);
  const {data} = await Axios.get<WarningListResponse>(`${config.apiUrl}/rule-warning/`, {params: props});

  return data;
}