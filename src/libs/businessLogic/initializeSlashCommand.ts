import { Command } from "../../types/Shared/Command"
import config from "../config";
import logger from "../logger";
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';

export const initializeSlashCommand = async (): Promise<Command[]> => {
  const commands = (await import('./commandCache')).default as Command[];

  if(config.shouldCreateCommands){
      logger.info('Registering interactions with Discord');
      const rest = new REST({ version: '9' }).setToken(config.discordToken);
      await rest.put(Routes.applicationCommands(config.discordClientId), { body: commands.map(x => x.data) })
      logger.info('Succesfully created slash interactions with Discord');
  }

  return commands;
}