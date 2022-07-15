const { Hash } = require("../modules/func.js")
//const dbi = require("../modules/dbinteract.js")

exports.run = async(client, message, params, perms) => {
  h = await Hash(message.content)
  //i = await dbi.newCase(client, message)
  message.reply(h.hash + h.time + h.orig)
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['hashtest'],
  permLevel: 8
};

exports.help = {
  name: 'hash',
  description: 'Test Command.',
  usage: 'hash (message)'
}
