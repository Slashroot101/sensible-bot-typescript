import { ButtonInteraction, CategoryChannel, ChannelType } from "discord.js";
import { Guild } from "../../types/Guild";
import { TaskTopic } from "../../types/Shared/Task";
import { TicketQueueTopics, TicketStatus } from "../../types/Ticket";
import { User } from "../../types/User";
import { queryTicket, updateTicket } from "../api/Ticket";
import logger from "../logger";

export default async function(interaction: ButtonInteraction, user: User, guild: Guild) {
  logger.debug(`Handling ticket deny with [userId=${user.id}]/[guildId=${guild.id}]`);

  const tickets = await queryTicket({discordChannelSnowflake: interaction.channelId});
  const ticket = tickets[0];

  logger.debug(`Handling ticket deny for [ticketId=${ticket.id}]/[userId=${user.id}]`);

  await updateTicket(ticket.id, {reason: ticket.reason, status: TicketStatus.Open});
  await interaction.message.edit({content: 'This close request was denied by the submitting user.', embeds: [], components: []});
}