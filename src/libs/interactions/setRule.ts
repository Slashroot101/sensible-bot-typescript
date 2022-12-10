import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Guild } from "../../types/Guild";
import { User } from "../../types/User";
import { updateGuildRule } from "../api/GuildRule";
import { getRuleData, loadRuleData } from "../api/Rule";
import logger from "../logger";

export default {
  data: new SlashCommandBuilder()
  .setName('setrule')
  .setDescription('Sets a rule on/off for the server')
  .addStringOption(opt => {
      const {rules} = getRuleData();
      return opt
              .setName('name')
              .setDescription('Rule name to patch')
              .setRequired(true)
              .addChoices(...rules.map(x => {return {name: x.name, value: x.id.toString()}}));
  }) 
  .addStringOption(opt => {
      const {ruleActions} = getRuleData();
      return opt
          .setName('action')
          .setDescription('What action should occur if this rule is broken')
          .setRequired(true)
          .addChoices(...ruleActions.map(x => {return {name: x.name, value: x.id.toString()}}));
  })
  .addBooleanOption(opt => opt.setName('enabled').setDescription('Whether or not the rule is enabled').setRequired(true)),
  async execute(interaction: ChatInputCommandInteraction, user: User, guild: Guild) {
    logger.info(`Processing command /setrule for user [discordSnowflake=${interaction.user.id}]`);
    const ruleName = interaction!.options!.get('name')!.value as string;
    const ruleAction = interaction.options.get('action')!.value as string;
    const enabled = interaction!.options!.get('enabled')!.value as boolean;

    await updateGuildRule(guild.id, ruleName, {rule: {ruleActionId: ruleAction, enabled, discordGuildId: guild.id, ruleId: ruleName,}});
    await interaction.reply('Succesfully updated the rule!');
}
}