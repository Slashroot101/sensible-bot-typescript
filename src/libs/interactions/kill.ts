import { Interaction, Message, SlashCommandBuilder, User } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName('kill')
    .setDescription('Kills the bot.'),
  async execute(interaction: Message, user: User){
    process.exit();
  }
}