import { Interaction } from "discord.js";
import { updateTicket } from '../api/Ticket';
import { ButtonEnum } from "../../types/Help";
import getOrCreateGuild from "../businessLogic/getOrCreateGuild";
import getOrCreateUser from "../businessLogic/getOrCreateUser";
import getOrCreateUserGuild from "../businessLogic/getOrCreateUserGuild";
import handleTicketCreate from "../businessLogic/handleTicketCreate";
import handleTicketDeny from "../businessLogic/handleTicketDeny";
import handleTicketResolve from "../businessLogic/handleTicketResolve";
import logger from "../logger";

export default async function(interaction: Interaction) {
  try {
    if (interaction.user.bot) return;

    const user = await getOrCreateUser(interaction.user!.id);
    const guild = await getOrCreateGuild(interaction.guild!.id);
    const userGuild = await getOrCreateUserGuild(guild.id, user.id, interaction.guild?.ownerId === interaction.user.id);

    if(interaction.isChatInputCommand()){
      const command = await (await (await import('../discordClient')).establishDiscordClientConnection).commands.get(interaction.commandName);
      
      if(!command){
        logger.info(`${interaction.commandName} does not exist but was tried to be invoked`);
        return;
      }
      
      logger.info(`Attempting to execute ${interaction.commandName} for [guildId=${guild.id}]/[userId=${user.id}]`);
      await command.execute(interaction, user, guild, userGuild);
    }

    if(interaction.isModalSubmit()){
      if(interaction.customId.includes('ticketReasonFields')){
        console.log(interaction.customId);
        const id = Number(interaction.customId.split('|')[1]);
        logger.info(`Received ticketReason update for [ticketId=${id}]`);

        await updateTicket(id, {reason: interaction.fields.getTextInputValue('ticketReason')});
      }

      interaction.deferUpdate();

      return;
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
          await handleTicketCreate(interaction, user, guild, userGuild);
          break;
        case ButtonEnum.Deny.toString():
          logger.debug(`Received deny button interaction from [userId=${user.id}]/[guildId=${guild.id}]`);
          handleTicketDeny(interaction, user, guild, userGuild);
          break;
        case ButtonEnum.Resolve.toString():
          logger.debug(`Received resolve button interaction from [userId=${user.id}]/[guildId=${guild.id}]`);
          handleTicketResolve(interaction, user, guild, userGuild);
          break;
      }
    }
  } catch (err) {
      logger.error(err, 'An error occured executing a command');
  }
}