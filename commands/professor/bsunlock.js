const { textId, rolesId } = require('../../variablehandler.js')
const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, message, args, prefix) => {
    const professorRole = rolesId.professor
    const facilitatorRole = rolesId.facilitator
    const lockingPerms = message.member.roles.cache.has({ professorRole, facilitatorRole }) || message.member.roles.cache.has(rolesId.staff)
    const moderatorRole = message.guild.roles.cache.get(rolesId.staff)
    const memberrole = message.guild.roles.cache.get(rolesId.member)
    const regularrole = message.guild.roles.cache.get(rolesId.regular)
    const muted = message.guild.roles.cache.get(rolesId.muted)
    const bstext = textId.biblestudy
    const errorEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setFooter({ text: '© FaithChatt Forum' });
    const successEmbed = new MessageEmbed()
        .setColor("#ffff00")
        .setTitle('<:Staged:880649462492569651> Session is about to start in a few moments.')
        .setDescription("Head over to <#840942889340239914> and study the Word with us!")
        .setFooter({ text:"© FaithChatt Forum" });
    if(lockingPerms) {
        if(message.channel.id === bstext){
            await message.channel.permissionOverwrites.edit(message.guild.id, { "SEND_MESSAGES": null })
            await message.channel.permissionOverwrites.edit(moderatorRole.id, { "SEND_MESSAGES": true })
            await message.channel.permissionOverwrites.edit(memberrole.id, { "SEND_MESSAGES": true })
            await message.channel.permissionOverwrites.edit(regularrole.id, { "SEND_MESSAGES": null })
            await message.channel.permissionOverwrites.edit(muted.id, { "SEND_MESSAGES": false })
            message.channel.send({ embeds: [successEmbed] })
        } else {
            message.delete()
            errorEmbed.setDescription('This command is only accessible to the Bible Study/Sermon Text Chatt.')
            message.author.send({ embeds: [errorEmbed] }).catch(e => {})
        }
   } else {
       message.delete();
       try {
            message.author.send({ embeds: [
                new MessageEmbed()
                .setDescription("❌ | You are not a staff member authorized to use this command.")
                .setColor("#ff0000")
            ]})
        } catch (error) {
            console.log(error)
        }
   }
}

module.exports.command = {
    name: "bsunlock",
    aliases: []
}