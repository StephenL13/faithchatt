const client = require(`../index.js`).client
const { createCmd } = require('../datahandler')
client.on('ready', () => {
  client.user.setActivity('discord.gg/FaithChatt', { type: "PLAYING" })
  console.log('The bot is ready!')
  
  // initialize slash commands, disabled atm
  // createCmd(client, "839708279973478430")
});