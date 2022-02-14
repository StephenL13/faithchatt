const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args, prefix) => {
  let moderator = message.member.roles.cache.has("871058889339207681");

  if(message.member.permissions.has("MANAGE_ROLES")){
    if (moderator) {
      const lockEmbed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle("🔐 Channel is unlocked.")
        .setFooter({ text: "© FaithChatt Forum" });
        message.channel.permissionOverwrites.edit(message.guild.id, {
          SEND_MESSAGES: true,
        });
        message.channel.permissionOverwrites.edit(
          message.guild.roles.cache.get("871058889339207681"),
          {
            SEND_MESSAGES: null,
          }
        );
      message.channel.send({ embeds: [lockEmbed] });
    } else {
      message.delete();
      message.author.send("You are not a staff member authorized to use this command.");
    }
  }
};

module.exports.command = {
  name: "unlock",
  aliases: []
}
