const logger = require("../modules/logger.js")
// Shoved into new bot from avaira project
exports.run = (client, message, params, perms) => {
  if (params[0] >= 2 || params[0] === 1 || !params[0]) {
    //const commandNames = Array.from(client.commands.keys());
    if (params[0] === undefined) {
      var page = 1
    } else {
      var page = params[0]
    }
    const level = perms
    // goodCommands = myCommands
    const goodCommands = client.container.commands.filter(cmd => cmd.conf.permLevel <= level && cmd.conf.enabled !== false)
    const commandNames = goodCommands.keys()
    var longest = Array.from(goodCommands.keys())
    //const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    let header = `= ${client.user.tag} Commands (AUTH ${perms} @ ${(new Date()) - client.container.ActionTime.getTime()}ms) =\n\n[Page ${page}, ${client.PREFIX}help <commandname> for details]\n`;
    //header+=`* Level ${message.author.level}, Silver ${message.author.silver}, Gold ${message.author.gold}\n\n`
    let output = ``
    goodCommands.forEach( c => {
      output += `${client.container.Config.PREFIX}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}\n* GUILD ${c.conf.guildOnly} AUTH ${c.conf.permLevel}\n`
    })
    let hLen = 0 + ((page*1 - 1) * 1800)
    let hMax = hLen + 1800
    message.author.send(`\`\`\`asciidoc\n` + header + output.substring(hLen,hMax) + `\`\`\``);
    return;
    } else {
    let command = params[0];
    if (client.container.commands.has(command)) {
      command = client.container.commands.get(command);
      message.author.send(`\`\`\`asciidoc\n= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\nshortcuts:: ${command.conf.aliases.join(', ')}\`\`\``);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'cmds', 'man'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all available commands for your permission level.',
  usage: 'help [command/pagenumber]'
};
