import { Message } from "discord.js";
import getOrCreateGuild from "../businessLogic/getOrCreateGuild";
import getOrCreateUser from "../businessLogic/getOrCreateUser";
import getOrCreateUserGuild from "../businessLogic/getOrCreateUserGuild";
import logger from "../logger";

export default async function(e: Message){
  if(e.author.bot === true) return;
  const nats = await (await import('../queue/index')).establishQueueConnection;
  logger.info(`MessageCreate interaction for user [discordSnowflake=${e.author.id}]`);
  const user = await getOrCreateUser(e.author!.id);
  const guild = await getOrCreateGuild(e.guild!.id);
  await getOrCreateUserGuild(guild.id, user.id, e.guild?.ownerId === e.member?.id);
  nats.publish('MessageCreate', Buffer.from(JSON.stringify({guild, user, msg: e.content, channel: e.channel.id, messageId: e.id, messageCreationDate: e.createdAt})));
}