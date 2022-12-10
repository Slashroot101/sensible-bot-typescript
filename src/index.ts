import logger from "./libs/logger";

export default (async function(){
  logger.info('Bot beginning startup phase');

  await (await import('./libs/discordClient')).establishDiscordClientConnection;
  await (await import('./libs/queue/index')).establishQueueConnection; 

  logger.info('Completed bot startup phase');
})();



