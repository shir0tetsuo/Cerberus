const moment = require('moment')
const logger = require("../modules/logger.js")

exports.run = async (client, message, params, perms) => {
  // @mention or ID works.
  mention = message.mentions.members.first() || message.mentions.users.first();
  if (mention) { user = mention } else {
    user = message.guild.members.cache.get(params[0]) || await message.guild.members.fetch(params[0])
  }
  if (!user) return message.reply(`couldn't find a user by that ID.`)
  logger.log(`(${user.id})`,"debug")
  userRoles = user.roles.cache.map(r => `${r}`).join(' | ');
  joinDiscord = moment(user.user.createdAt).format('lll') + '\n*' + moment(new Date()).diff(user.user.createdAt, 'days') + ' days ago*';
  joinServer = moment(user.joinedAt).format('lll') + '\n*' + moment(new Date()).diff(user.joinedAt, 'days') + ' days ago*'
  //`${user} \`${user.id}\`\n\`Joined Discord:\` ${joinDiscord}\n\`Joined Server:\` ${joinServer}\n${userRoles}`
  message.reply({ embeds: [{
    color: 0x2d9582,
    title: `User Information (${(new Date()) - client.container.ActionTime.getTime()}ms)`,
    thumbnail: {
      url: `${user.displayAvatarURL()}`
    },
    fields: [{
      name: `${user.id}`,
      value: `${user}\n\`Joined Discord:\` ${joinDiscord}\n\`Joined Server:\` ${joinServer}`
    },
    {
      name: `Roles`,
      value: userRoles
    }],
    timestamp: `${new Date()}`,
  }]})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['chk','id','u','user','whois','who'],
  permLevel: 1
};

exports.help = {
  name: 'check',
  description: 'Display user information.',
  usage: 'u [ID]'
}
