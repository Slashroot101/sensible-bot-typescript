import logger from "../logger";
import { getUserGuild, createUserGuild } from "../api/UserGuild";
import { UserGuild } from "../../types/UserGuild";

export default async function(discordGuildId: number, discordUserId: number, isAdmin: boolean): Promise<UserGuild> {
  logger.info(`Attempting to find or create UserGuild for [discordGuildId=${discordGuildId}]/[discordUserId=${discordUserId}]`);
  const userGuild = await getUserGuild(discordGuildId, discordUserId);
  if(!userGuild){
    logger.info(`UserGuild did not exist for [discordGuildId=${discordGuildId}]/[discordUserId=${discordUserId}], creating it`);
    return await (await createUserGuild({discordGuildId, discordUserId, isAdmin}));
  }

  return userGuild;
}