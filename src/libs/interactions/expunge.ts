import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Guild } from "../../types/Guild";
import { User } from "../../types/User";
import { expungeWarning, updateWarning } from "../api/Warning";
import logger from "../logger";

export default {
  data: new SlashCommandBuilder()
                            .setName('expunge')
                            .setDescription('Expunges a warning from a user')
                            .addNumberOption(opt => opt.setName('warningid').setDescription('The warning ID of the warning to expunge').setRequired(true)),
  async execute(interaction: ChatInputCommandInteraction, user: User, guild: Guild) {
    const warningId = interaction!.options!.get('warningid')!.value as string;
    logger.info(`Executing expunge for offense [warningId=${warningId}]`);

    await expungeWarning(warningId);
    await interaction.reply(`Expunged that warning!`);
  }                    
}