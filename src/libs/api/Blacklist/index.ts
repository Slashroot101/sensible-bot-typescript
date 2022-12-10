import { Blacklist, BlacklistCreateRequest, BlacklistDeleteRequest } from "../../../types/Blacklist";
import Axios from "axios";
import logger from "../../logger/index";
import config from "../../config/index";

export const addWord = async (guildId: string, props: BlacklistCreateRequest): Promise<Blacklist> => {
  logger.info(`Creating blacklist word for [guildId=${guildId}] and [word=${props.blacklist.word}] `);
  const { data } = await Axios.post<Blacklist>(`${config.apiUrl}/guild-blacklist/discord-guild/${guildId}`, {...props});

  return data;
}

export const deleteWord = async (guildId: string, props: BlacklistDeleteRequest): Promise<void> => {
  logger.info(`Deleting blacklist word for [guildId=${guildId}] and [word=${props.blacklist.word}] `);
  await Axios.put(`${config.apiUrl}/guild-blacklist/discord-guild/${guildId}/delete`, {...props});
}