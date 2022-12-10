import { Msg, NatsError } from "nats";
import { MessagePunishment } from "../../../types/Queue";
import logger from "../../logger";
import { Client, TextChannel } from "discord.js";

export const handlePunish = async (err: NatsError | null, msg: Msg): Promise<void> => {
  const client = await (await import('../../discordClient')).establishDiscordClientConnection;
  logger.info(`Received punishment`);

  const parsedMessage = JSON.parse(msg.data.toString()) as MessagePunishment;
  const channel = client.channels.cache.get(parsedMessage.channel) as TextChannel;

  if(!channel){
    logger.info(`Channel no longer found for [channelId=${parsedMessage.channel}]`);
    return;
  }

  const message = await channel.messages.fetch(parsedMessage.messageId);
  const guild = await client.guilds.cache.get(parsedMessage.guild.discordSnowflake);

  if(!guild){
    logger.info(`Guild not found for [guildId=${parsedMessage.guild.discordSnowflake}]`);
    return;
  }

  const member = guild.members.cache.get(parsedMessage.user.discordSnowflake);

  if(!member){
    logger.info(`Member no longer found for [userId=${parsedMessage.user.discordSnowflake}]`);
    return;
  }

  const shouldDelete = parsedMessage.punishments.filter(x => x['swearing']?.contains || x['blacklist']?.contains);
  if (shouldDelete.length){
      logger.info(`Deleting message [messageId=${parsedMessage.messageId}]`);
      await message.delete();
      await channel.send(`<@${parsedMessage.user.discordSnowflake}>, you are not allowed to say that! I have deleted your message`);
  }

  const swearing = shouldDelete.filter(x => x['swearing']?.contains)[0];
  const blacklist = shouldDelete.filter(x => x['blacklist']?.contains)[0];
  if(member.permissionsIn(channel).has('Administrator')){ 
      logger.info(`[userId=${member.id}] cannot be punished due to administrator permissions`);    
      return;
  }

  if(swearing?.swearing?.punishment === 'ban' || blacklist?.blacklist?.punishment === 'ban'){
      logger.info(`Banning user [userId=${member.id}]`);
      if(member.bannable){
          await member.ban();
      } else {
          logger.info(`Was not able to ban [userId=${member.id}] due to permissions`);
      }
  }
  if(swearing?.swearing?.punishment === 'timeout' || blacklist?.blacklist?.punishment === 'timeout'){
      logger.info(`Timining out user [userId=${member.id}]`);
      await member.timeout(60*1000*10);
  }
  if(swearing?.swearing?.punishment === 'kick' || blacklist?.blacklist?.punishment === 'kick'){
      logger.info(`Kicking user [userId=${member.id}]`);
      await member.kick();
  }
};