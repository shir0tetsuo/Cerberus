const logger = require("../modules/logger.js")

exports.run = async (client, message, params, level) => {
  var p = params[0]; // p = command/number
  if (!p) var p = 1; // If no input, default to page 1

  const discordMaximumSendLength = 1850;

  const goodCommands = client.container.commands.filter(cmd => cmd.conf.permLevel <= level && cmd.conf.enabled !== false);// array of good commands
  const commandNames = goodCommands.keys();// keys of good commands
  const longest = Array.from(goodCommands.keys()).reduce(function (a,b) { return a.length > b.length ? a : b });//.length - the longest command name

  const allHeader = `\`\`\`asciidoc\n`, allEnder = `\`\`\``; // Unless there's another method - but this works fine

  var current = 0;//current line
  var line = {};//line data
  var pageData = {};//lines of data

  // Convert good commands into a readable line.
  // Program reads all command lines before executing rest of script.
  goodCommands.forEach( c => {
    line[current] = `${client.container.Config.PREFIX}${c.help.name}${' '.repeat(longest.length - c.help.name.length)} :: ${c.help.description}\n`
    line[current] += `${' '.repeat(longest.length + client.container.Config.PREFIX.length)} Server-Only: ${c.conf.guildOnly}, Authority: ${c.conf.permLevel}\n`
    current++
  })

  // Is the parameter a number (page):
  if (Number.isInteger(parseInt(p))) {
    if (parseInt(p) < 1) return message.reply(`Can't go below Page 1.`)
    max_lines = current;// If the program goes over this number, the program must stop.
    current = 0;//reset current for line[current]
    page = 0;//current page
    var buffer = "";
    while (page != p) {
      // If there's space in the buffer, add a line. If not, stop.
      while (buffer.length < discordMaximumSendLength && (buffer.length + line[current].length) < discordMaximumSendLength) {
        buffer += line[current]
        current++
        if (!line[current]) break;
      }
      page++
      pageData[page] = `${allHeader}= ${client.user.tag} Commands (Authority ${level}) =\n\n[Page ${page}, ${client.container.Config.PREFIX}help <page-number> or ${client.container.Config.PREFIX}help <commandname> for details]\n\n${buffer}`
      if (line[current]) pageData[page] += `\nMore Pages Available.`;
      if (!line[current]) break;
      buffer = ""
    }
    // If the page exists
    if (pageData[p]) {
      message.reply(`\`${(new Date()) - client.container.ActionTime.getTime()}ms\` ` + pageData[p] + `${allEnder} `)
    } else {
      // If page number is beyond the scope
      if (page == 1) {
        message.reply(`There's only 1 page.`)
      } else {
        message.reply(`There are only ${page} pages.`)
      }
    }
  // or is parameter the name of a command?:
  } else {
    if (client.container.commands.has(p)) {
      command = client.container.commands.get(p);
      message.reply({ embeds: [{
        color: 0x2d9582,
        title: `${command.help.name} Information (${(new Date()) - client.container.ActionTime.getTime()}ms)`,
        fields: [{
          name: `Description`,
          value: `${command.help.description}\n\`Usage:\` ${command.help.usage}`
        },
        {
          name: `Authority`,
          value: `Level: ${command.conf.permLevel}\n\`Server-Only: ${command.conf.guildOnly}\``
        },
        {
          name: `Shortcuts`,
          value: `${command.conf.aliases.join(', ')}`
        }]
      }]})
    }
  }
}

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
