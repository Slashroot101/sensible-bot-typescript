import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CategoryChannel, ChannelType, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import logger from "../logger";
import { Guild } from "../../types/Guild";
import { User } from "../../types/User";
import { getGuild, setTicketCategory, setTicketCreationChannel } from "../api/Guild";
import getOrCreateGuild from "../businessLogic/getOrCreateGuild";
import { ButtonEnum } from "../../types/Help";

export default {
  data: new SlashCommandBuilder()
    .setName('autosetup')
    .setDescription('Creates a ticket category for Sensible to create tickets under'),
  async execute(interaction: ChatInputCommandInteraction, user: User, guild: Guild) {
    logger.info(`Procesing command /createTicketCategory for user [discordSnowflake=${user.discordSnowflake}]`);
    const client = await (await (await import('../discordClient')).establishDiscordClientConnection);

    //check if ticket category channel already exists
    const discordGuild = await getOrCreateGuild(guild.discordSnowflake);
    const guildInstance = await client.guilds.fetch(discordGuild.discordSnowflake);
    let category = null;
    if(discordGuild.ticketCategoryId){
      logger.debug(`Guild [guildId=${discordGuild.discordSnowflake}] already has a category [channelId=${discordGuild.ticketCategoryId}], checking that it still exists`);
      const channel = await guildInstance.channels.cache.get(discordGuild.ticketCategoryId);

      if(channel){
        logger.debug(`Guild [guildId=${discordGuild.discordSnowflake}] with [channelId=${discordGuild.ticketCategoryId}] exists, skipping category creation`);
        category = channel as CategoryChannel;
      } else {
        logger.debug(`Guild [guildId=${discordGuild.discordSnowflake}] with [channelId=${discordGuild.ticketCategoryId}] was ephemeral, creating`);
        const channelCategory = await guildInstance.channels.create({name: 'TICKET-HELP', type: ChannelType.GuildCategory, permissionOverwrites: [{
          deny: 'SendMessages',
          id: guildInstance.roles.everyone,
        }]});
        category = channelCategory;
        await setTicketCategory({ticketCategoryId: channelCategory.id}, guild.id);
      }
    } else {
      const channelCategory = await guildInstance.channels.create({name: 'TICKET-HELP', type: ChannelType.GuildCategory, permissionOverwrites: [{
        deny: 'SendMessages',
        id: guildInstance.roles.everyone,
      }]});
      await setTicketCategory({ticketCategoryId: channelCategory.id}, guild.id);
    }

    if(discordGuild.ticketCreationChannelId) {
      const channel = await guildInstance.channels.cache.get(discordGuild.ticketCreationChannelId);

      if(channel){
        logger.debug(`Guild [guildId=${discordGuild.discordSnowflake}] with [channelId=${discordGuild.ticketCreationChannelId}] exists, skipping channel creation`);
      } else {
        logger.debug(`Guild [guildId=${discordGuild.discordSnowflake}] with [channelId=${discordGuild.ticketCreationChannelId}] was ephemeral, creating`);
        const creationChannel = await guildInstance.channels.create({name: 'TICKET-HELP', type: ChannelType.GuildText, parent: category, permissionOverwrites: [{
          deny: 'SendMessages',
          id: guildInstance.roles.everyone,
        }]});
        const helpEmbed = new EmbedBuilder()
        .setTitle('Get Help')
        .setDescription('Click on the reactions below to get help from the admins!')
        .setColor(0x00FFFF)
        .setImage(`https://img.freepik.com/premium-vector/cinema-ticket_1459-2366.jpg?w=2000`);

        const buttons = new ActionRowBuilder<ButtonBuilder>()
                                          .addComponents(
                                            new ButtonBuilder()
                                              .setCustomId(ButtonEnum.Ticket.toString())
                                              .setLabel('Create Ticket')
                                              .setStyle(ButtonStyle.Success),
                                          )
                                          .addComponents(
                                            new ButtonBuilder()
                                            .setCustomId(ButtonEnum.Report.toString())
                                            .setLabel('Report a User')
                                            .setStyle(ButtonStyle.Danger),
                                          )
                                          .addComponents(
                                            new ButtonBuilder()
                                            .setCustomId(ButtonEnum.Question.toString())
                                            .setLabel('Ask a question!')
                                            .setStyle(ButtonStyle.Primary)
                                          );

        await creationChannel.send({embeds: [helpEmbed], components: [buttons]});
        await setTicketCreationChannel({ticketCreationChannelId: creationChannel.id}, guild.id);
      }
    } else {
      logger.debug(`Guild [guildId=${discordGuild.discordSnowflake}] with [channelId=${discordGuild.ticketCreationChannelId}] was ephemeral, creating`);
      const creationChannel = await guildInstance.channels.create({name: 'TICKET-HELP', type: ChannelType.GuildText, parent: category, permissionOverwrites: [{
        deny: 'SendMessages',
        id: guildInstance.roles.everyone,
      }]});

      const helpEmbed = new EmbedBuilder()
      .setTitle('Get Help')
      .setDescription('Click on the reactions below to get help from the admins!')
      .setColor(0x00FFFF)
      .setImage(`https://img.freepik.com/premium-vector/cinema-ticket_1459-2366.jpg?w=2000`);

      const buttons = new ActionRowBuilder<ButtonBuilder>()
                                        .addComponents(
                                          new ButtonBuilder()
                                            .setCustomId(ButtonEnum.Ticket.toString())
                                            .setLabel('Create Ticket')
                                            .setStyle(ButtonStyle.Success),
                                        )
                                        .addComponents(
                                          new ButtonBuilder()
                                          .setCustomId(ButtonEnum.Report.toString())
                                          .setLabel('Report a User')
                                          .setStyle(ButtonStyle.Danger),
                                        )
                                        .addComponents(
                                          new ButtonBuilder()
                                          .setCustomId(ButtonEnum.Question.toString())
                                          .setLabel('Ask a question!')
                                          .setStyle(ButtonStyle.Primary)
                                        );

      await creationChannel.send({embeds: [helpEmbed], components: [buttons]});
      await setTicketCreationChannel({ticketCreationChannelId: creationChannel.id}, guild.id);
    }

    return await interaction.reply('Channnel and category creation has completed!');
  }
}