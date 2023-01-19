import { Guild, User } from "discord.js";

export type Ticket = {
  id: number;
  submittedByUserId: number;
  discordGuildId: number;
  discordChannelSnowflake: string;
  status: TicketStatus;
}

export type TicketBeforeCreate = {
  submittedByUserId: number;
  discordGuildId: number;
  discordChannelSnowflake: string;
  status: TicketStatus;
}

export type TicketQuery = {
  status?: string;
  discordGuildId?: number;
  submittedByUserId?: number;
  discordChannelSnowflake?: string;
}

export type TicketQueryResponse = {
  tickets: Ticket[];
}

export type TicketStatusUpdate = {
  reason: string;
  status: string;
}

export type TicketUpdateResponse = {
  ticket: Ticket;
}

export type TicketResolutionMessage = {
  ticketId: string,
  channelId: string,
  user: User,
  guild: Guild,
  reason: string,
}

export enum TicketStatus {
  Open = "Open",
  Resolved = "Resolved"
}

export enum TicketQueueTopics {
  TicketCreate = "TicketCreate",
  TicketResolution = "TicketResolution",
}