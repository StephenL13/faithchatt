const { textId, rolesId } = require('../../variablehandler.js')
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
  if(message.channel.id === textId.biblestudy) return message.delete().catch(e=>{})
  if(message.member.permissions.has("MANAGE_ROLES")){
    if (message.member.roles.cache.has(rolesId.staff)) {
      const moderatorRole = message.member.roles.cache.get(rolesId.staff)
      const lockEmbed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle("🔐 Channel is unlocked.")
        .setFooter({ text: "© FaithChatt Forum" });
      await message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: null });
      await message.channel.permissionOverwrites.edit(moderatorRole.id, { SEND_MESSAGES: true });
      await message.channel.permissionOverwrites.edit(memberrole.id, { SEND_MESSAGES: true });
      await message.channel.permissionOverwrites.edit(regularrole.id, { SEND_MESSAGES: null });
      await message.channel.permissionOverwrites.edit(muted.id, { SEND_MESSAGES: false });
      await message.channel.send({ embeds: [lockEmbed] });
    } else {
      await message.delete();
      await message.author.send("You are not a staff member authorized to use this command.");
    }
  }
};

module.exports.command = {
  name: "unlock",
  aliases: []
}
