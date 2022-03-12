const { textId, rolesId } = require('../../variablehandler.js')
const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, message, args, prefix) => {
    let moderator = message.member.roles.cache.has(rolesId.staff)
    if(message.channel.id === textId.biblestudy) return message.delete().catch(e=>{})
    if(message.member.permissions.has("MANAGE_ROLES")) {
      if (moderator) {
        const lockEmbed = new MessageEmbed()
          .setColor("#FF0000")
          .setTitle("🔒 Channel is locked.")
          .setDescription(
            "**You are not muted.**\nIt is currently on lockdown, please wait until the staff unlocks this channel."
          )
          .setFooter({ text: "© FaithChatt Forum" });
        message.channel.permissionOverwrites.edit(message.guild.id, {
          SEND_MESSAGES: false,
        });
        message.channel.permissionOverwrites.edit();
        message.channel.permissionOverwrites.edit();
        message.channel.permissionOverwrites.edit();
        message.channel.permissionOverwrites.edit();
        message.channel.send({ embeds: [lockEmbed] });
      } else {
        message.delete();
        message.author.send(
          { content:"You are not a staff member authorized to use this command." }
        );
      }
    }
  }
  
module.exports.command = {
  name: "lock",
  aliases: []
}