import logger from "../logger";
import {connect, NatsConnection} from 'nats';
import config from "../config";
import * as QueueHandlers from './handlers';
import { handlePunish } from "./handlers/handlePunish";

export const establishQueueConnection = (async (): Promise<NatsConnection> => {
  logger.info('Attempting NATS connection');
  const nats = await connect({
    servers: config.natsUrl,
  });
  logger.info('NATS connection complete');

  logger.info('Creating NATS subscriptions');
  nats.subscribe('punish', {callback: handlePunish});
  logger.info('Completed NATS subscriptions');

  logger.info('Completed NATS connection queue');
  return nats;
})();

export const queueHandlers = QueueHandlers;


