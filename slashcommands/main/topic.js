const { MessageEmbed } = require("discord.js");
const { miscValues } = require('../../variablehandler.js')

module.exports.run = async (client, interaction) => {
  const topic = miscValues.questions;
  
  var num = Math.floor(Math.random()*topic.length);
  const embed = new MessageEmbed()
    .setDescription(`**${topic[num]}**`)
    .setColor("#ffd100")
    .setFooter({ text: "© FaithChatt Forum" })
    .setTimestamp()
  interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
};

module.exports.command = {
  name: "topic"
};
