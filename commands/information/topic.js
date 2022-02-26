const { MessageEmbed } = require("discord.js");
const { miscValues } = require('../../variablehandler.js')

module.exports.run = async (client, message, args, prefix) => {
  const topic = miscValues.questions;
  
  var num = Math.floor(Math.random()*topic.length);
  const embed = new MessageEmbed()
    .setDescription(`**${topic[num]}**`)
    .setColor("#ffd100")
    .setFooter({ text: "© FaithChatt Forum" })
    .setTimestamp();
  await message.delete();
  await message.channel.send({ embeds: [embed] });
};

module.exports.command = {
  name: "topic",
  aliases: [],
};
