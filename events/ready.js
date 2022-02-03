const client = require(`../index.js`).client

client.on('ready', () => {
  client.user.setActivity('discord.gg/FaithChatt', { type: "PLAYING" })
  console.log('The bot is ready!')
});