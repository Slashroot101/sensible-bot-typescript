import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Guild } from "../../types/Guild";
import { User } from "../../types/User";
import { getDiscordRuleByRuleAction, updateGuildRule } from "../api/GuildRule";
import { getRuleData, loadRuleData } from "../api/Rule";
import { createTier, getTier, patchTier } from "../api/Tier";
import logger from "../logger";

export default {
  data: new SlashCommandBuilder()
                          .setName('tier')
                          .setDescription('Add/updates your tier based punishments')
                          .addStringOption(opt => {
                            const {rules} = getRuleData();
                            return opt
                                    .setName('name')
                                    .setDescription('what rule to apply this tier to')
                                    .setRequired(true)
                                    .addChoices(...rules.map(x => {return {name: x.name, value: x.id.toString()}}));
                        }) 
                        .addStringOption(opt => {
                            const {ruleActions} = getRuleData();
                            return opt
                                .setName('action')
                                .setDescription('what action should occur when the threshold is reached')
                                .setRequired(true)
                                .addChoices(...ruleActions.filter(x => x.name !== 'tiered').map(x => {return {name: x.name, value: x.id.toString()}}));
                        })
                        .addNumberOption(opt => opt.setName('maxoffenses').setDescription('The max offenses before this tier is executed').setRequired(true)),
                        async execute(interaction: ChatInputCommandInteraction, user: User, guild: Guild) {
                          logger.info(`Processing command /tier for user [discordSnowflake=${interaction.user.id}]`);
                          const ruleId = interaction!.options!.get('name')!.value as string;
                          const actionId = interaction.options.get('action')!.value as string;
                          const maxOffenses = interaction.options.get('maxoffenses')!.value as string;
                      
                          let discordRule = await getDiscordRuleByRuleAction(ruleId, actionId);
                      
                          if(!discordRule.discordGuildRule){
                            logger.info(`Creating discord rule because it does not exist [ruleId=${ruleId}]/[actionId=${actionId}]/[guildId=${guild.id}]`);
                            discordRule = await updateGuildRule(guild.id, ruleId, {rule: {enabled: true, discordGuildId: guild.id, ruleId: ruleId,}});
                          }
                          console.log(discordRule)
                          const tier = await getTier(actionId, discordRule.discordGuildRule.id);
                          if(tier.tier){
                            await patchTier(tier.tier.id, {tier: {maxOffenses, discordGuildRuleId: discordRule.discordGuildRule.id, ruleActionId: actionId}});
                            await interaction.reply(`Succesfully updated the tier!`);
                          } else {
                            await createTier({tier: {discordGuildRuleId: discordRule.discordGuildRule.id, maxOffenses, ruleActionId: actionId}});
                            await interaction.reply(`Succesfully added the tier!`);
                          }
                        }
}