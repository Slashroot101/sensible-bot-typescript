import { Interaction, Message, SlashCommandBuilder, User } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Gives a quick pong back to verify the bot is up and running'),
  async execute(interaction: Message, user: User){
    await interaction.reply('Pong!');
  }
}