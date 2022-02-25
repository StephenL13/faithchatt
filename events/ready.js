const client = require(`../index.js`).client
const { createCmd } = require('../dataHandler')
client.on('ready', () => {
  client.user.setActivity('discord.gg/faithchatt', { type: "PLAYING" })
  console.log('The bot is ready!')
  
  // initialize slash commands; server ID: 839708279973478430
  createCmd(client, "839708279973478430")
});