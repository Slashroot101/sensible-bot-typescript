import { ChatInputCommandInteraction, Interaction, Message, SlashCommandBuilder } from "discord.js";
import { EmbedBuilder } from "@discordjs/builders";
import { queryWarnings } from "../api/Warning";
import getOrCreateUser from "../businessLogic/getOrCreateUser";
import { User } from "../../types/User";

export default {
  data: new SlashCommandBuilder()
                        .setName('audit')
                        .setDescription('Audits a user for behavior')
                        .addStringOption(opt => opt.setName('user').setDescription('The user to audit').setRequired(true)),
  async execute(interaction: ChatInputCommandInteraction, user: User){
    const targetUser: string = interaction!.options!.get('user')!.value! as string;
    const discordUser = interaction.client.users.cache.get(targetUser)!;
    if(!discordUser){
      return await interaction.reply(`Please provide a valid discord user id!`);
    }
    const savedUser = await getOrCreateUser(targetUser);
    const warnings = await queryWarnings({discordUserId: savedUser.id});
    const fields = warnings.warnings.map(warning => {
       return { name: `${warning.discordGuildRule.rule.name}: ${warning.id}`, value: `Expunged: ${warning.isExpunged}`, inline: true };
    });

    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setAuthor({name: `${discordUser.username}`})
        .setDescription(`User has received: ${warnings.warnings.length} warnings. Last 10 infractions:`)
        .addFields(fields.splice(0, 10));

    await interaction.reply({content: 'Here is the user report: ', embeds: [embed]});
  }
}