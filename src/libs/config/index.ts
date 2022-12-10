const dotenv = require('dotenv');

if(!process.env.NODE_ENV) {
  throw new Error('NODE_ENV is not defined');
}

dotenv.config({ path: `${process.cwd()}/.${process.env.NODE_ENV.replace(' ', '')}.env`});

if(!process.env.API_URL || !process.env.DISCORD_TOKEN || !process.env.DISCORD_CLIENT_ID || !process.env.SHOULD_CREATE_COMMANDS || !process.env.NATS_URL){
  throw new Error('Required environment variables not provided. Please check configuration');
}

export default {
  apiUrl: process.env.API_URL,
  discordToken: process.env.DISCORD_TOKEN,
  discordClientId: process.env.DISCORD_CLIENT_ID,
  shouldCreateCommands: process.env.SHOULD_CREATE_COMMANDS === 'true',
  natsUrl: process.env.NATS_URL,
};