import Axios from "axios";
import logger from "../../logger/index";
import config from "../../config/index";
import { Ticket, TicketBeforeCreate, TicketQuery, TicketQueryResponse, TicketStatusUpdate, TicketUpdateResponse } from "../../../types/Ticket";

export const createTicket = async function (request: TicketBeforeCreate): Promise<Ticket> {
  logger.info('Creating ticket with Axios post');
  const { data } = await Axios.post<Ticket>(`${config.apiUrl}/ticket`, request);

  return data;
}

export const queryTicket = async function (request: TicketQuery): Promise<Ticket[]> {
  logger.debug(`Querying for tickets with query: ${request}`);
  const { data } = await Axios.get<TicketQueryResponse>(`${config.apiUrl}/ticket`, {params: request});
  return data.tickets;
}

export const updateTicket = async function (id: string, request: TicketStatusUpdate): Promise<Ticket> {
  logger.debug(`Updating ticket [ticketId=${id}]`);
  const { data } = await Axios.put<TicketUpdateResponse>(`${config.apiUrl}/ticket/${id}`, {params: request});
  return data.ticket;
}