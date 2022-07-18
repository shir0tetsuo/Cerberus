const logger = require("../modules/logger.js")
const { permlevel } = require("../modules/dbinteract.js")
/*
    Command Run Block

    1.
    ActionTime: approx. time command was executed
      => client.container.ActionTime

    2.
    (In guild but not in cache: Refresh cache)
    pemissions: message author permission level

    3.
    command => params, cmd
    permLevel: The user's determined permission level.
      => message.author.permLevel

    4.
    cmd => check if OK => [try execute]
*/
module.exports = async (client, message) => {
  if (message.author.bot) return; // no bots
  if (!message.content.startsWith(client.container.Config.PREFIX)) return; // no prefix, nothing to do

  client.container.ActionTime = new Date(); // time scripts began processing result
  client.container.MessageTime = message.createdTimestamp;
  if (message.guild && !message.member) await message.guild.members.fetch(message.author); // cache refresh if needed
  let permissions = await permlevel(client, message); // calculate the permission level

  let command = message.content.split(' ')[0].slice(client.container.Config.PREFIX.length); // the command
  let params = message.content.split(' ').slice(1); // the parameters
  // set cmd: check to see if the command or the command alias exists
  const cmd = client.container.commands.get(command) || client.container.commands.get(client.container.aliases.get(command));

  if (!cmd) return;// No command found

  // attach permLevel to author
  message.author.permLevel = permissions;

  // enabled/authorized check
  if (cmd) {
    if (cmd.conf.guildOnly == true && message.channel.type === "DM") return message.reply(`\`${cmd.help.name}\` is a server-only command.`);// Guild-Only check
    if (cmd.conf.enabled == false) return;// Enabled check
    if (permissions < cmd.conf.permLevel) return;// Permission check

    // final execution
    try {
      await cmd.run(client, message, params, permissions);
      logger.log(`${message.author.tag} runs ${client.container.Config.PREFIX}${cmd.help.name} (auth ${permissions})`,"cmd")
    } catch (e) {
      console.error(e);
      message.channel.send({ content: `Error running ${cmd.help.name}:\n\`\`\`${e.message}\`\`\`` })
        .catch(e => console.error("Reply error", e));
    }
  }
}
