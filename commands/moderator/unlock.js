const { textId, rolesId } = require('../../variablehandler.js')
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
  const memberrole = message.guild.roles.cache.get(rolesId.member)
  const regularrole = message.guild.roles.cache.get(rolesId.regular)
  const muted = message.guild.roles.cache.get(rolesId.muted)
  const moderatorCheck = message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("BAN_MEMBERS")
  const moderatorRole = message.guild.roles.cache.get(rolesId.moderator)
  if(message.channel.id === textId.biblestudy) return message.delete().catch(e=>{})
  if(!moderatorCheck) return message.delete().then(()=>{
    try {
      message.author.send({ embeds: [
          new MessageEmbed()
          .setDescription("❌ | You are not a staff member authorized to use this command.")
          .setColor("#ff0000")
      ]})
    } catch (error) {
        console.log(error)
    }
  })
  const lockEmbed = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle("🔐 Channel is unlocked.")
    .setFooter({ text: "© FaithChatt Forum" });
  await message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false });
  await message.channel.permissionOverwrites.edit(moderatorRole.id, { SEND_MESSAGES: true });
  await message.channel.permissionOverwrites.edit(memberrole.id, { SEND_MESSAGES: true });
  await message.channel.permissionOverwrites.edit(regularrole.id, { SEND_MESSAGES: null });
  await message.channel.permissionOverwrites.edit(muted.id, { SEND_MESSAGES: false });
  await message.channel.send({ embeds: [lockEmbed] });
}

module.exports.command = {
  name: "unlock",
  aliases: []
}
