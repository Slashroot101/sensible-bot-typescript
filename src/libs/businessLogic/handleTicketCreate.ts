import { Guild } from "../../types/Guild";
import { User } from "../../types/User";
import logger from "../logger";


export default async function(user: User, guild: Guild) {
  logger.debug(`Handling ticket create for user [userId=${user.id}]/[guildId=${guild.id}]`);

  
}