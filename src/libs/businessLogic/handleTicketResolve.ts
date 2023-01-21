import { randomUUID } from "crypto";
import { ButtonInteraction, CategoryChannel, ChannelType } from "discord.js";
import { Guild } from "../../types/Guild";
import { TaskTopic } from "../../types/Shared/Task";
import { TicketQueueTopics, TicketStatus } from "../../types/Ticket";
import { User } from "../../types/User";
import { queryTicket } from "../api/Ticket";
import logger from "../logger";


export default async function(interaction: ButtonInteraction, user: User, guild: Guild) {
  logger.debug(`Handling ticket resolution with [userId=${user.id}]/[guildId=${guild.id}]`);

  const tickets = await queryTicket({discordChannelSnowflake: interaction.channelId});
  const ticket = tickets[0];

  logger.debug(`Handling ticket resolution for [ticketId=${ticket.id}]/[userId=${user.id}]`);

  if(user.id !== ticket.submittedByUserId){
    await interaction.deferUpdate();
    return interaction!.channel!.send(`<@${interaction.user.id}>, you must be the submitter to approve the ticket resolution!`);
  }

  logger.debug(`Dispatching message for ticket resolution for [ticketId=${ticket.id}]`);
  const nats = await (await import('../queue/index')).establishQueueConnection;
  nats.publish(TaskTopic.TaskCreate, Buffer.from(JSON.stringify({payload: {ticketId: ticket.id, channelId: interaction.channelId, user, guild, reason: ticket.reason}, occurenceRate: 'Once', eventType: TicketQueueTopics.TicketResolution, minutes: 0, reason: ticket.reason, correlationId: randomUUID()})));
  return interaction!.channel!.send(`Ticket closure will happen shortly!`);
}