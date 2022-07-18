exports.run = async (client, message, args, level) => {
  const msg = await message.channel.send(`Ping!`)
  msg.edit(`Pong! \`${msg.createdTimestamp - message.createdTimestamp}ms\``)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pong'],
  permLevel: 1
};

exports.help = {
  name: 'ping',
  description: 'Calculates milliseconds between user interaction and server response.',
  usage: 'ping'
};
