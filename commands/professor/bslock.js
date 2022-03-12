const { textId, rolesId } = require('../../variablehandler.js')
const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, message, args, prefix) => {
    const professorRole = rolesId.professor
    const facilitatorRole = rolesId.facilitator
    const memberrole = message.member.roles.cache.get(rolesId.member)
    const regularrole = message.member.roles.cache.get(rolesId.regular)
    const muted = message.member.roles.cache.get(rolesId.muted)
    const bstext = textId.biblestudy
    const errorEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setFooter({ text: '© FaithChatt Forum' });
    const successEmbed = new MessageEmbed()
        .setTitle('<:Unstaged:880650957925519441> Bible study channel is now locked.')
        .setColor('#ffd100')
        .setDescription(`For more upcoming bible studies, please check the **📅 Events** tab.\nIn the meantime, you can also check out our radio station channels Moody Radio, RefNet, and Worship Radio.\n\nThanks for joining with us. God bless you.`)
        .setImage('https://media1.giphy.com/media/z1kL3TjrK278E6EhZF/giphy.gif?cid=790b7611e06601e976e82fa774ae08ceab4bd86a1f6672ea&rid=giphy.gif&ct=g')
        .setFooter({ text:"© FaithChatt Forum" });
    if(message.member.roles.cache.has({ professorRole, facilitatorRole }) || message.member.permissions.has("MANAGE_ROLES")) {
        if(message.channel.id === bstext){
            await message.channel.permissionOverwrites.edit(message.guild.id, { "SEND_MESSAGES": false })
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