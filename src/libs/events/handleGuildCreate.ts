import { Guild } from "discord.js";
import getOrCreateGuild from "../businessLogic/getOrCreateGuild";

export default async function(e: Guild){
  await getOrCreateGuild(e.id);
}