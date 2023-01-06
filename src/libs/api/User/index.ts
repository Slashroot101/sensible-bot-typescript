import Axios from "axios";
import logger from "../../logger/index";
import config from "../../config/index";
import { CreateUserResponse, DiscordUserBeforeCreate, GetUserRequest, GetUserResponse } from "../../../types/User";

export const createUser = async (props: DiscordUserBeforeCreate): Promise<CreateUserResponse> => {
  logger.debug(`Creating user with Axios post with [discordSnowflake=${props.discordSnowflake}]`)
  const {data} = await Axios.post<CreateUserResponse>(`${config.apiUrl}/discord-user/`, {discordSnowflake: props.discordSnowflake});
  return data;
}

export const getUser = async (props: GetUserRequest): Promise<GetUserResponse> => {
  logger.debug(`Querying for users with Axios get with [discordSnowflake=${props.discordSnowflake}]`);
  const {data} = await Axios.get<GetUserResponse>(`${config.apiUrl}/discord-user`, {params: props});

  return data;
}