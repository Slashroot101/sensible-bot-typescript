import { ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from "discord.js";
import { Guild } from "../../types/Guild";
import { User } from "../../types/User";
import logger from "../logger";

export default {
  data: new SlashCommandBuilder()
                      .setName('purge')
                      .setDescription('Purges the last X number of messages. Cannot delete any messages older than 14 days')
                      .addNumberOption(opt => opt.setName('nummessages').setDescription('Number of messages to delete').setRequired(true)),
  async execute(interaction: ChatInputCommandInteraction, user: User, guild: Guild) {
    const numMessages = interaction!.options!.get('nummessages')!.value as number;

    if(numMessages > 100) {
        return await interaction.reply('You cannot delete more than 100 messages at once due to Discord limitations');
    }

    await (interaction!.channel! as TextChannel).bulkDelete(numMessages);
    await interaction.reply('Messages deleted');
  }
}