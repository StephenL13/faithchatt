const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports.run = async (client, message, args, prefix) => {
  if (message.author.id === '136292974379270144') {
    message.channel.send("Hello world.")
  } else return message.channel.send("This is a developer-mode command.")
}

module.exports.command = {
  name: "eval",
  aliases: []
}