import { User } from "../../types/User";
import { getUser, createUser } from "../api/User";
import logger from "../logger";

export default async function(discordSnowflake: string): Promise<User>{
  logger.info(`Attempting to find or create user for [discordSnowflake=${discordSnowflake}]`);
  const users = await getUser({discordSnowflake});
  console.log(users)
  let user = null;
  if(!users.discordUsers.length){
      logger.info(`User did not exist for [discordSnowflake=${discordSnowflake}], creating.`)
      return await (await createUser({discordSnowflake})).discordUser;
  }
  if(users.discordUsers.length > 1) {
      throw new Error(`More than one user with the same snowflake exists for [discordSnowflake=${users.discordUsers[0].discordSnowflake}]`);
  }

  if(users.discordUsers.length === 1){
      user = users.discordUsers[0];
  }

  return user!;
}