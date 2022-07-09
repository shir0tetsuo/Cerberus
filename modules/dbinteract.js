// Database Interactions
// Modified template from anidiots.guide

const logger = require("./logger.js");
//const moment = require('moment')

const roles = {
  // See .env for ROLE_ELEVATEDUSER, ROLE_MODERATOR, ROLE_ADMIN, OWNER
  // or append/modify the data structure below as needed.
  // This may be modified/depreciated in the future, may make multi-server compatibility.

  // Changing these arrays requires a restart.
  // Bot Admins ID Array (lvl 9)
  "botadmins": [],
  // Bot Support ID Array (Lvl 8)
  "botsupport": [],

  permLevels: [
    { level: 0,
      name: "User",
      check: () => true
    },

    {
      level: 1,
      name: "Privileged",
      check: (client, message) => {
        try {
          if (message.member.roles.cache.has(client.container.Config.ROLE_ELEVATEDUSER)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 2,
      name: "Moderator",
      check: (client, message) => {
        try {
          if (message.member.roles.cache.has(client.container.Config.ROLE_MODERATOR)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator",
      check: (client, message) => {
        try {
          if (message.member.roles.cache.has(client.container.Config.ROLE_ADMIN)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    {
      level: 4,
      name: "Server Owner",
      check: (client, message) => {
        try {
          const serverOwner = message.author ?? message.user;
          return message.guild?.ownerId === serverOwner.id;
        } catch (e) {
          return false;
        }
      }
    },

    {
      level: 8,
      name: "Bot Support",
      check: (client, message) => {
        const botSupport = message.author ?? message.user;
        return roles.botsupport.includes(botSupport.id);
      }
    },

    {
      level: 9,
      name: "Bot Administrator",
      check: (client, message) => {
        const botAdmin = message.author ?? message.user;
        return roles.botadmins.includes(botAdmin.id);
      }
    },

    {
      // Highest role can run `eval`
      level: 10,
      name: "The Authority",
      check: (client, message) => {
        const owner = message.author ?? message.user;
        return owner.id === client.container.Config.OWNER;
      }
    }
  ]
};

// Permissions Level Calculator
function permlevel(client, message) {
  var permlvl = 0;

  const permOrder = roles.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

  while (permOrder.length) {
    const currentLevel = permOrder.shift();
    //if (message.guild) continue;
    if (currentLevel.check(client, message)) {
      permlvl = currentLevel.level;
      break;
    }
  }

  //logger.log(`permlvl: ${permlvl}`,"debug")

  return permlvl;
}

module.exports = { permlevel, roles };
