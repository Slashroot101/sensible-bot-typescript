import { Interaction } from "discord.js";
import { ButtonEnum } from "../../types/Help";
import getOrCreateGuild from "../businessLogic/getOrCreateGuild";
import getOrCreateUser from "../businessLogic/getOrCreateUser";
import handleTicketCreate from "../businessLogic/handleTicketCreate";
import logger from "../logger";

export default async function(interaction: Interaction) {
  try {
    if (interaction.user.bot) return;

    const user = await getOrCreateUser(interaction.user!.id);
    const guild = await getOrCreateGuild(interaction.guild!.id);

    if(interaction.isChatInputCommand()){
      const command = await (await (await import('../discordClient')).establishDiscordClientConnection).commands.get(interaction.commandName);
      
      if(!command){
        logger.info(`${interaction.commandName} does not exist but was tried to be invoked`);
        return;
      }
      
      logger.info(`Attempting to execute ${interaction.commandName} for [guildId=${guild.id}]/[userId=${user.id}]`);
      await command.execute(interaction, user, guild);
    }

    if(interaction.isButton()){
      switch(interaction.customId){
        case ButtonEnum.Question.toString():
          logger.debug(`Received question button interaction from [userId=${user.id}]/[guildId=${guild.id}]`)
          break;
        case ButtonEnum.Report.toString():
          logger.debug(`Received report button interaction from [userId=${user.id}]/[guildId=${guild.id}]`)
          break;
        case ButtonEnum.Ticket.toString():
          logger.debug(`Received ticket button interaction from [userId=${user.id}]/[guildId=${guild.id}]`)
          await handleTicketCreate(user, guild);
          break;
      }
    }
  } catch (err) {
      logger.error(err, 'An error occured executing a command');
  }
}