import { randomUUID } from "crypto";
import { ButtonInteraction, CategoryChannel, ChannelType } from "discord.js";
import { Guild } from "../../types/Guild";
import { TicketStatus } from "../../types/Ticket";
import { User } from "../../types/User";
import { UserGuild } from "../../types/UserGuild";
import { createTicket } from "../api/Ticket";
import logger from "../logger";


export default async function(interaction: ButtonInteraction, user: User, guild: Guild, userGuild: UserGuild) {
  logger.debug(`Handling ticket create for user [userId=${user.id}]/[guildId=${guild.id}]`);
  const client = await (await (await import('../discordClient')).establishDiscordClientConnection);
  if(!guild.ticketCategoryId){
    return logger.warn(`Ticket category [ticketCategoryId=${guild.ticketCategoryId}] in guild [guildId=${guild.id}] does not exist.`);
  }
  const category = await client.channels.fetch(guild.ticketCategoryId) as CategoryChannel;
  const guildInstance = await client.guilds.fetch(guild.discordSnowflake);
  const channel = await guildInstance.channels.create({name: randomUUID(), parent: category, permissionOverwrites: [{
    id: guildInstance.roles.everyone,
    deny: 'ViewChannel',
  }, {
    id: user.discordSnowflake,
    allow: 'ViewChannel',
  }], type: ChannelType.GuildText});
  
  await createTicket({userGuildId: userGuild.id, discordChannelSnowflake: channel.id, status: TicketStatus.Open});

  await channel.send({content: `<@${user.discordSnowflake}>, I have created a ticket for you here in this channel! You can type out what exactly is going on here and an admin will get right on it!`});
}