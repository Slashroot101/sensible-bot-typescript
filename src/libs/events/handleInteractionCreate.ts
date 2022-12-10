import { Interaction, Message } from "discord.js";
import { User } from "../../types/User";
import getOrCreateGuild from "../businessLogic/getOrCreateGuild";
import getOrCreateUser from "../businessLogic/getOrCreateUser";
import logger from "../logger";

export default async function(interaction: Interaction) {
  try {
    if (!interaction.isChatInputCommand()) return;

    const user = await getOrCreateUser(interaction.user!.id);
    const guild = await getOrCreateGuild(interaction.guild!.id);
    const command = await (await (await import('../discordClient')).establishDiscordClientConnection).commands.get(interaction.commandName);
    
    if(!command){
      logger.info(`${interaction.commandName} does not exist but was tried to be invoked`);
      return;
    }
    
    logger.info(`Attempting to execute ${interaction.commandName} for [guildId=${guild.id}]/[userId=${user.id}]`);
    await command.execute(interaction, user, guild);
} catch (err) {
    logger.error(err, 'An error occured executing a command');
}
}