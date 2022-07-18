const logger = require("../modules/logger.js")
const { roles } = require("../modules/dbinteract.js")

exports.run = async (client, message, params, level) => {
  await message.reply(`Bot shutting down.`);
  process.exit(0);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['botoff','restart'],
  permLevel: 10
};

exports.help = {
  name: 'botstop',
  description: 'Exit bot application process.',
  usage: 'botstop'
};
