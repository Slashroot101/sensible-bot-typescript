import { readdirSync } from "fs";
import path from 'path';
import { Command } from "../../types/Shared/Command";

import logger from "../logger";
const commands: Command[] = [];
const commandFiles = readdirSync(path.resolve(process.cwd(), './src/libs/interactions')).filter(file => file.endsWith('.ts'));

for(const file of commandFiles){
  logger.info(`Loading interaction ./src/libs/interactions/${file}`)
  const command = require(`../interactions/${file}`).default as Command;
  commands.push(command);
  logger.info(`Finished loading interactions`);
}

export default commands;