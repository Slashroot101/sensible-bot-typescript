import Axios from "axios";
import logger from "../../logger/index";
import config from "../../config/index";
import { GetQueryRequest, PatchExpungeWarning, WarningListResponse, WarningPatchResponse } from "../../../types/Warning";

export const queryWarnings = async (props: GetQueryRequest): Promise<WarningListResponse> => {
  logger.info(`Querying for user warnings for user [discordUserId=${props.discordUserId}]`);
  const {data} = await Axios.get<WarningListResponse>(`${config.apiUrl}/rule-warning/`, {params: props});

  return data;
}

export const updateWarning = async (props: PatchExpungeWarning, warningId: string): Promise<WarningPatchResponse> => {
  logger.info(`Patching warning for warning [warningId=${warningId}]`);
  const {data} = await Axios.patch<WarningPatchResponse>(`${config.apiUrl}/rule-warning/${warningId}`, {params: props});

  return data;
}

export const expungeWarning = async (warningId: string): Promise<WarningPatchResponse> => {
  logger.info(`Put warning for warning [warningId=${warningId}]`);
  const {data} = await Axios.put(`${config.apiUrl}/rule-warning/${warningId}/expunge`, {});

  return data;
}