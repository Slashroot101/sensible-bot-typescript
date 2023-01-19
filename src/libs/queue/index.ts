import logger from "../logger";
import {connect, NatsConnection} from 'nats';
import config from "../config";
import * as QueueHandlers from './handlers';
import { handlePunish } from "./handlers/handlePunish";
import { TicketQueueTopics } from "../../types/Ticket";
import { handleTicketResolution } from "./handlers/handleTicketResolution";

export const establishQueueConnection = (async (): Promise<NatsConnection> => {
  logger.info('Attempting NATS connection');
  const nats = await connect({
    servers: config.natsUrl,
  });
  logger.info('NATS connection complete');

  logger.info('Creating NATS subscriptions');
  nats.subscribe('punish', {callback: handlePunish});
  nats.subscribe(TicketQueueTopics.TicketResolution, {callback: handleTicketResolution});
  logger.info('Completed NATS subscriptions');

  logger.info('Completed NATS connection queue');
  return nats;
})();

export const queueHandlers = QueueHandlers;


