const { textId, rolesId } = require('../../variablehandler.js')
const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, message, args, prefix) => {
    const professorRole = rolesId.professor
    const facilitatorRole = rolesId.facilitator
    const memberrole = message.member.roles.cache.get(rolesId.member)
    const bstext = textId.biblestudy
    const errorEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setFooter({ text: '© FaithChatt Forum' });
    const successEmbed = new MessageEmbed()
        .setColor("#ffff00")
        .setDescription("<:Staged:880649462492569651> Session is about to start in a few moments.\nHead over to <#840942889340239914> and study the Word with us!")
        .setFooter({ text:"© FaithChatt Forum" });
    if(message.member.roles.cache.has({ professorRole, facilitatorRole }) || message.member.permissions.has("MANAGE_ROLES")) {
        if(message.channel.id === bstext){
            await message.channel.permissionOverwrites.edit(message.guild.id, { "SEND_MESSAGES": null })
            await message.channel.permissionOverwrites.edit(memberrole.id, { "SEND_MESSAGES": null })
            message.channel.send({ embeds: [successEmbed] })
        } else {
            message.delete()
            errorEmbed.setDescription('This command is only accessible to the Bible Study/Sermon Text Chatt.')
            message.author.send({ embeds: [errorEmbed] }).catch(e => {})
        }

   } else {
       message.delete();
       const inaccessEmbed = new MessageEmbed()
       .setColor("#ff0000")
       .setDescription('You are not a staff member authorized to use this command.')
       message.author.send({ embeds: [inaccessEmbed] }).catch(e => {})
   }
}

module.exports.command = {
    name: "bsunlock",
    aliases: []
}