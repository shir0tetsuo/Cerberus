/*
Logger class for easy and aesthetically pleasing console logging
*/
const { cyan, red, magenta, gray, yellow, white, green } = require("colorette");
const { Timestamp } = require("time-utilities");

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

exports.log = (content, type = "log") => {
  const date = new Date()
  const [month, day, year, hours, minutes, seconds] = [zeroPad(date.getMonth(),2), zeroPad(date.getDate(),2), zeroPad(date.getFullYear(),2), zeroPad(date.getHours(),2), zeroPad(date.getMinutes(),2), zeroPad(date.getSeconds(),2)]
  const timestamp = cyan(`[${month}/${day}/${year}::${hours}:${minutes}:${seconds}]:`)

  switch (type) {
    case "log": return console.log(`${timestamp} ${cyan(type.toUpperCase())} ${content} `);
    case "warn": return console.log(`${timestamp} ${yellow(type.toUpperCase())} ${content} `);
    case "error": return console.log(`${timestamp} ${red(type.toUpperCase())} ${content} `);
    case "debug": return console.log(`${timestamp} ${magenta(type.toUpperCase())} ${content} `);
    case "cmd": return console.log(`${timestamp} ${white(type.toUpperCase())} ${content}`);
    case "ready": return console.log(`${timestamp} ${green(type.toUpperCase())} ${content}`);
    default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
  }
};

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");
