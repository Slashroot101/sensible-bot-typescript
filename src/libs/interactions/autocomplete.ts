import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CategoryChannel, ChannelType, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import logger from "../logger";
import { Guild } from "../../types/Guild";
import { User } from "../../types/User";
import { queryTicket } from "../api/Ticket";
import { ButtonEnum } from "../../types/Help";
import { TicketQueueTopics } from "../../types/Ticket";
import { TaskTopic } from "../../types/Shared/Task";

export default {
  data: new SlashCommandBuilder()
    .setName('autoclose')
    .addStringOption(e => e.setName('reason').setDescription('The reason for why the ticket is being closed').setRequired(true))
    .addIntegerOption(e => e.setName('hours').setDescription('Number of hours to wait before ticket is closed. This can be decimal hours.').setRequired(false))
    .setDescription('Completes a ticket with approval from the user or after a desired time'),
  async execute(interaction: ChatInputCommandInteraction, user: User, guild: Guild) {
    const hours: number | undefined = Number(interaction!.options!.get('hours')?.value);
    const reason = interaction!.options!.get('reason')?.value;

    const tickets = await queryTicket({discordChannelSnowflake: interaction.channelId});

    if(!tickets.length){
      logger.debug(`User [userId=${user.id}] in guild [guildId=${guild}] tried to autoclose a ticket in channel [channelId=${interaction.channelId}] but there was no ticket`);
      return interaction.reply('there is no active ticket in this channel.');
    }

    const ticket = tickets[0];
    logger.info(`Beginning autoclose for [ticketId=${ticket.id}]`);
    const nats = await (await import('../queue/index')).establishQueueConnection;

    if(hours){
      logger.debug(`Adding queue task for TicketResolution [ticketId=${ticket.id}] to execute in [hours=${hours}] for [reason=${reason}]`);
      nats.publish(TaskTopic.TaskCreate, Buffer.from(JSON.stringify({payload: {ticketId: ticket.id, channelId: interaction.channelId, user, guild, reason}, occurenceRate: 'Once', eventType: TicketQueueTopics.TicketResolution, minutes: hours * 60, reason})));
    }
    
    const executionDate = new Date();
    executionDate.setHours(new Date().getHours() + hours);

    const helpEmbed = new EmbedBuilder()
      .setTitle('Resolve Ticket')
      .setDescription(`<@${user.discordSnowflake}> has requested to resolve this ticket with the following reason: \n \`${reason}\` \n Please accept or deny ${hours ? `or the ticket will close at ${executionDate}` : '.'}`);

      const buttons = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(ButtonEnum.Resolve.toString())
          .setLabel('Resolve')
          .setStyle(ButtonStyle.Success),
      )
      .addComponents(
        new ButtonBuilder()
        .setCustomId(ButtonEnum.Deny.toString())
        .setLabel('Deny')
        .setStyle(ButtonStyle.Danger),
      );

    return interaction.reply({embeds: [helpEmbed], components: [buttons]});
  }
}