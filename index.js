const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
const express = require('express');
const fs = require('fs');
require('dotenv').config();

client.commands = new Discord.Collection();
client.slashCmds = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
require('./mongo.js')();

module.exports.client = client;

// COMMAND HANDLER
fs.readdirSync(`./commands/`).forEach(dir => {
  fs.readdir(`./commands/${dir}`, (err, files) => {
    if (err) throw err;

    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) return console.log("[COMMAND HANDLER] - ~~Yet to be loaded or no avail~~");

    jsFiles.forEach(file => {
      var fileGet = require(`./commands/${dir}/${file}`);
      console.log(`[COMMAND HANDLER] - ${file} is now loaded!`)

      try {
        client.commands.set(fileGet.command.name, fileGet)
        fileGet.command.aliases.forEach(alias => {
          client.aliases.set(alias, fileGet.command.name)
        })
      } catch (err) {
        return console.log(err);
      }
    });
  });
});

// SLASH COMMANDS
fs.readdirSync(`./slashcommands/`).forEach(dir => {
  fs.readdir(`./slashcommands/${dir}`, (err, files) => {
    if (err) throw err;

    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) return console.log("[SLASH CMD HANDLER] - ~~Yet to be loaded or no avail~~");

    jsFiles.forEach(file => {
      var fileGet = require(`./slashcommands/${dir}/${file}`);
      console.log(`[SLASH CMD HANDLER] - ${file} is now loaded!`)

      try {
        client.slashCmds.set(fileGet.command.name, fileGet)
      } catch (err) {
        return console.log(err);
      }
    });
  });
});

// EVENT HANDLER
fs.readdirSync('./events/').forEach(file => {
  var jsFiles = fs.readdirSync('./events/').filter(f => f.split(".").pop() === "js")
  if(jsFiles.length <= 0) return console.log("[EVENT HANDLER] - ~~Yet to be loaded or no avail~~");

  jsFiles.forEach(file => {
    const eventGet = require(`./events/${file}`)
    console.log(`[EVENT HANDLER] - ${file} is now loaded!`)
    try {
      client.events.set(eventGet.name, eventGet)
    } catch (error) {
      return console.log(error)
    };
  });
});

try {
  const server = express();
  server.all("/", (req, res) => {
    res.send("Bot is running!")
  })
  
  function keepAlive() {
    server.listen(3000, () => {
      console.log("Server is ready.")
    })
  }

  keepAlive();
} catch (error) {
  console.log(error)
}

client.login(process.env.TOKEN);