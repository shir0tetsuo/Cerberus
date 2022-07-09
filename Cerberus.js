// https://github.com/AnIdiotsGuide/guidebot/blob/master/LICENSE
// Modified by shadowsword#0179

// throw error on old node version
if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Node 16.x + required.")

require("dotenv").config();
Config = process.env

const logger = require("./modules/logger.js");
//const { dbinit } = require("./modules/dbi.js")
//const dbi = require("./modules/dbi.js")
const { readdirSync } = require("fs");
const { Client, Intents, Collection } = require("discord.js");
const Sequelize = require('sequelize')
// The Client and Intents are destructured from discord.js, since it exports an object by default. Read up on destructuring here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
  partials: ["CHANNEL"]
});

// Database Stuff
// Database Initialization
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'Cerberus.db',
});
// Defining tables
const Cases = sequelize.define('cases', {
  // case id (unique)
  case_id: {
    type: Sequelize.STRING,
    unique: true,
  },
  // ID of who generated the case
  owner_id: {
    type: Sequelize.STRING,
    defaultValue: '0',
    allowNull: false,
  },
  // ID of against
  subject_id: {
    type: Sequelize.STRING,
    defaultValue: '0',
    allowNull: false,
  },
  // Roles subject had before moderation
  subject_roles: {
    type: Sequelize.STRING,
    defaultValue: '0',
    allowNull: false,
  },
  // note, warn, mute, kick, ban
  case_type: {
    type: Sequelize.STRING,
    defaultValue: 'warn',
    allowNull: false,
  },
  // Mute clock, (check every 59 mins)
  case_clock: {
    type: Sequelize.STRING,
    defaultValue: '0',
    allowNull: false,
  },
  // Case status (open 1/true closed 0/false)
  case_open: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  // What happened
  description: {
    type: Sequelize.STRING,
    defaultValue: '0',
    allowNull: false,
  },
});

const commands = new Collection();
const aliases = new Collection();

client.container = {
  commands,
  aliases,
  Config,
  Cases
  // (messageCreate) => ActionTime
}

const init = async () => {
  logger.log(`init Cerberus bot`,"debug")
  logger.log(`= v${client.container.Config.VERSION} =`,"debug")
  logger.log(`shadowsword#0179 https://github.com/shir0tetsuo/Cerberus`, "debug")

  // Database
  await client.container.Cases.sync();
  logger.log(`Cases Load: Sync success.`,"ready")

  // load commands
  const commands = readdirSync("./commands/").filter(file => file.endsWith(".js"));
  for (const file of commands) {
    const props = require(`./commands/${file}`);
    logger.log(`Command Load: ${props.help.name}. 👌`, "log")
    client.container.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.container.aliases.set(alias, props.help.name)
    });
  }
  logger.log(`${commands.length} COMMANDS LOADED`, "ready")

  // load events
  const eventFiles = readdirSync("./events/").filter(file => file.endsWith(".js"));
  for (const file of eventFiles) {
    const eventName = file.split(".")[0];
    logger.log(`Event Load: ${eventName}. 👌`, "log")
    const Event = require(`./events/${file}`);
    client.on(eventName, Event.bind(null, client))
  }
  logger.log(`${eventFiles.length} EVENTS LOADED`, "ready")

  // login
  logger.log(`=> Client Login`,"debug")
  client.login(Config.TOKEN);
}

init();
