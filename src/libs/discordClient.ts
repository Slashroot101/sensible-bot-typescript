import logger from "./logger";
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { loadRuleData } from "./api/Rule";
import { initializeSlashCommand } from "./businessLogic/initializeSlashCommand";
import config from "./config";
import { Command } from "../types/Shared/Command";
import handleReady from "./events/handleReady";
import handleInteractionCreate from "./events/handleInteractionCreate";
import handleMessageCreate from "./events/handleMessageCreate";
import handleGuildCreate from "./events/handleGuildCreate";
import handleGuildDelete from "./events/handleGuildDelete";

class ExtendedClient extends Client {
  public commands: Collection<string, Command>;

  constructor(options: any){
       super(options);
       this.commands = new Collection();
  }
}

export const establishDiscordClientConnection = (async (): Promise<ExtendedClient> => {
  logger.info('Beginning Discord client connection process');

  const client = new ExtendedClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

  client.commands = new Collection();

  logger.info('Loading command data for DiscordClient and caching it.');
  await loadRuleData();
  logger.info('Completed caching rule data.');

  const commands = await initializeSlashCommand();
  commands.forEach(command => {
    logger.info(`Setting command ${command.data.name} data`);
    client.commands.set(command.data.name, command);
  });

  client.on('ready', handleReady);
  client.on('interactionCreate', handleInteractionCreate);
  client.on('messageCreate', handleMessageCreate);
  client.on('guildCreate', handleGuildCreate);
  client.on('guildDelete', handleGuildDelete);

  logger.info('Authenticating with Discord');
  await client.login(config.discordToken);
  logger.info('Completed Discord authentication');

  logger.info('Completed Discord client connection process');
  return client;
})();

