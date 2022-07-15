/*
  A command that only level 10 users should use, grabs the server's IP Address.
  This command is totally optional, feel free to remove it.
  But this would be mighty useful if you wanted to check if your IP matches the DNS with 8.8.8.8 Bot.

  Did I mention that this is a Linux-only command?
*/
var exec = require('child_process').exec;
const logger = require("../modules/logger.js")

exports.run = async(client, message, params, perms) => {
  logger.log(`Grabbing server IP address.`,"warn")
  // You can change what gets executed on the shell below.
  exec(`curl icanhazip.com`,
    function(error, stdout, stderr) {
      var output = ``;
      if (stdout) output += `__stdout__\n\`\`\`\n${stdout}\`\`\` `;
      if (stderr) output += `__stderr__\n\`\`\`\n${stderr}\`\`\` `;
      if (error) logger.log(error,"error");
      if (message.channel.type != "DM") return message.author.send(output)
      message.reply(output)
    }
  )
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['homeip'],
  permLevel: 10
};

exports.help = {
  name: 'global',
  description: 'Executes child process providing global IP address of application server in DM.',
  usage: 'global'
}
