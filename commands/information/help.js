const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
  const embed = new MessageEmbed()
    .setColor("#ffd100")
    .setTitle("The setlist of commands")
    .setDescription("**GENERAL USE**\n`!help` - This list\n`!ping` - Server ping\n`!membercount` - Human member count\n`!invite` - Server invite\n\n**SLASH COMMANDS**\n`/membercount` - Human member count\n`/pray` - Submit a prayer request")
    .setFooter({ text:"© FaithChatt Forum" })
  message.channel.send({ embeds: [embed] });
};

module.exports.command = {
  name: "help",
  aliases: [],
};
