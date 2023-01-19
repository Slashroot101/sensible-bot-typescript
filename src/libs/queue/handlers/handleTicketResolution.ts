import { Msg, NatsError } from "nats";
import { MessagePunishment } from "../../../types/Queue";
import logger from "../../logger";
import { Client, TextChannel } from "discord.js";
import { TicketResolutionMessage, TicketStatus } from "../../../types/Ticket";
import { updateTicket } from "../../api/Ticket";

export const handleTicketResolution = async (err: NatsError | null, msg: Msg): Promise<void> => {
  const client = await (await import('../../discordClient')).establishDiscordClientConnection;
  logger.info(`Received ticket resolution`);

  const parsedMessage = JSON.parse(msg.data.toString()) as TicketResolutionMessage;

  logger.debug(`Deleting channel [channelId${parsedMessage.channelId}] in [guildId=${parsedMessage.guild.id}]`);
  await client.channels.cache.get(parsedMessage.channelId)?.delete();

  await updateTicket(parsedMessage.ticketId, {reason: parsedMessage.reason, status: TicketStatus.Resolved});
}