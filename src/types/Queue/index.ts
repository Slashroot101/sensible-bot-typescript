import { Guild } from "../Guild";
import { User } from "../User";

export type MessageCreate = {
  guild: Guild;
  user: User;
  msg: string;
  channel: string;
  messageId: string;
}

export type MessagePunishment = {
  guild: Guild;
  user: User;
  msg: string;
  channel: string;
  messageId: string;
  punishments: PunishmentsObject[];
}

type PunishmentsObject = {
  swearing: PunishmentData | undefined;
  blacklist: PunishmentData | undefined;
  sentiment: PunishmentData | undefined;
};

type PunishmentData = {
  contains: boolean,
  punishment: string,
};