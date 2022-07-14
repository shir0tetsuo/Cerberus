// https://github.com/AnIdiotsGuide/guidebot/blob/master/modules/functions.js
const logger = require("./logger.js");
const SHA256 = require('crypto-js/sha256')

async function awaitReply(msg, question, limit = 60000) {
  const filter = m => m.author.id === msg.author.id;
  await msg.channel.send(question);
  try {
    const collected = await msg.channel.awaitMessages({ filter, max: 1, time: limit, errors: ["time"] });
    return collected.first().content;
  } catch (e) {
    return false;
  }
}

async function Hash(msg) {
  t = new Date().toLocaleString();
  const h = {
    hash: SHA256(msg + t).toString(),
    time: t,
    orig: msg
  }
  return h
}

process.on("unhandledRejection", err => {
  logger.error(`Unhandled rejection: ${err}`);
  console.error(err);
});

module.exports = { awaitReply, Hash };
