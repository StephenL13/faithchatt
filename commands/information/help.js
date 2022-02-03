const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
  const embed = new MessageEmbed()
    .setColor("#ffd100")
    .setTitle("The setlist of commands")
    .setDescription("**GENERAL USE**\n`!help` - This list\n`!ping` - Server ping\n`!invite` - Server invite\n\n**APPLICATION FORMS**\n`!moderatorform` `!adminform`\n`!teacherform` `!partnerform`\n\n**STAFF TEAM**\n`!bslock` - Locks the bible study text channel\n`!bsunlock` - Unlocks the bible study text channel")
    .setFooter({ text:"© FaithChatt Forum" });
  message.channel.send({ embeds: [embed] });
};

module.exports.command = {
  name: "help",
  aliases: [],
};
