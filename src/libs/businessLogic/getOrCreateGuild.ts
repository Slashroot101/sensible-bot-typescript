import logger from "../logger";
import { getGuild, createGuild } from "../api/Guild";
import { Guild, GuildCreateRequest } from "../../types/Guild";


export default async function(discordSnowflake: string): Promise<Guild> {
  logger.info(`Attempting to find or create guild for [discordSnowflake=${discordSnowflake}]`);
  const guilds = await getGuild({discordSnowflake});
  let guild = null;

  if(!guilds.discordGuilds.length){
      return (await createGuild({discordGuild: {discordSnowflake}})).discordGuild;
  }

  if(guilds.discordGuilds.length > 1) {
      throw new Error(`More than one guild with the same snowflake exists for [discordSnowflake=${guilds.discordGuilds[0].discordSnowflake}]`);
  }

  if(guilds.discordGuilds.length === 1){
      guild = guilds.discordGuilds[0];
  }

  return guild!;
}