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
        .setTitle('<:Unstaged:880650957925519441> Bible study channel is now locked.')
        .setColor('#ffd100')
        .setDescription(`For more upcoming bible studies, please check the **📅 Events** tab.\nIn the meantime, you can also check out our radio station channels __Moody Radio__, __RefNet__, and __Worship Radio__.\n\nThanks for joining with us. God bless you.`)
        .setFooter({ text:"© FaithChatt Forum" });
    if(lockingPerms) {
        if(message.channel.id === bstext){
            await message.channel.permissionOverwrites.edit(message.guild.id, { "SEND_MESSAGES": false })
            await message.channel.permissionOverwrites.edit(moderatorRole.id, { "SEND_MESSAGES": true })
            await message.channel.permissionOverwrites.edit(memberrole.id, { "SEND_MESSAGES": false })
            await message.channel.permissionOverwrites.edit(regularrole.id, { "SEND_MESSAGES": false })
            await message.channel.permissionOverwrites.edit(muted.id, { "SEND_MESSAGES": false })
            await message.channel.send({ embeds: [successEmbed] })
        } else {
            await message.delete()
            await errorEmbed.setDescription('This command is only accessible to the Bible Study/Sermon Text Chatt.')
            await message.author.send({ embeds: [errorEmbed] }).catch(e => {})
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
    name: "bslock",
    aliases: []
}