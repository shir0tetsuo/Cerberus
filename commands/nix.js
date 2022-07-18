/*
  Dangerous command lets you run anything on the server.
  Level 10 only.
*/
var exec = require('child_process').exec;
const logger = require("../modules/logger.js")

exports.run = async(client, message, params, perms) => {
  command = await params.join(" ")
  exec(`${command}`,
    function(error, stdout, stderr) {
      var output = ``;
      if (stdout) output += `__stdout__\n\`\`\`\n${stdout}\`\`\` `;
      if (stderr) output += `__stderr__\n\`\`\`\n${stderr}\`\`\` `;
      if (error) logger.log(error,"error");
      //if (message.channel.type != "DM") return message.author.send(output)
      message.reply(output)
    }
  )
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['linux'],
  permLevel: 10
};

exports.help = {
  name: 'nix',
  description: 'Executes process (Linux).',
  usage: 'nix <command-line argument>'
}
