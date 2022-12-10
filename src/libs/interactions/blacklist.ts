import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Guild } from "../../types/Guild";
import { User } from "../../types/User";
import {addWord, deleteWord} from '../api/Blacklist';
import logger from "../logger";

export default {
  data: new SlashCommandBuilder()
                            .setName('blacklist')
                            .setDescription('Adds/removes a word to the blacklist.')
                            .addStringOption(opt => opt.setName('word').setDescription('The word to add or remove').setRequired(true))
                            .addStringOption(opt => opt.setName('action').setDescription('Whether to add or remove from blacklist').setRequired(true).addChoices({name: 'Add', value: 'add'}, {name: 'Remove', value: 'remove'})),
  async execute(interaction: ChatInputCommandInteraction, user: User, guild: Guild) {
    const addOrRemove = interaction!.options!.get('action')!.value as string;
    const word = interaction!.options!.get('word')!.value as string;
    logger.info(`${addOrRemove}ing blacklist ${word} for [guildId=${interaction!.guild!.id}] `);
    if(addOrRemove === 'remove'){
      await deleteWord(guild.id, {blacklist: {word}});
    }

    if(addOrRemove === 'add'){
      await addWord(guild.id, {blacklist: {word}});
    }

    await interaction.reply(`Your word (${word}) has been ${addOrRemove}ed`);
  }                    
}