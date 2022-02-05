const { MessageEmbed } = require('discord.js')
const professorRole = '843151409167073350'
const facilitatorRole = '903033680497365033'
const bstext = '839953010142871552'

module.exports.run = async(client, message, args, prefix) => {
    const errorEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setFooter({ text: '© FaithChatt Forum' });
    const successEmbed = new MessageEmbed()
        .setColor('#ffd100')
        .setDescription('<:Unstaged:880650957925519441> **Bible study channel is now locked.**\n\nTune in next time by [checking out our schedules](https://discord.com/channels/839708279973478430/839965374967054386/936968689608163388) on <#839965374967054386>. Thanks for joining with us. God bless you.')
        .setImage('https://media1.giphy.com/media/z1kL3TjrK278E6EhZF/giphy.gif?cid=790b7611e06601e976e82fa774ae08ceab4bd86a1f6672ea&rid=giphy.gif&ct=g')
        .setFooter({ text:"© FaithChatt Forum" });
    if(message.member.roles.cache.has({ professorRole, facilitatorRole }) || message.member.permissions.has("MANAGE_ROLES")) {
        if(message.channel.id === bstext){
            message.channel.permissionOverwrites.edit(message.guild.id, {
                "SEND_MESSAGES": false
            })
            message.channel.send({ embeds: [successEmbed] })
        } else {
            message.delete()
            errorEmbed.setDescription('This command is only accessible to the Bible Study/Sermon Text Chatt.')
            message.author.send({ embeds: [errorEmbed] }).catch(e => {})
        }

   } else {
       message.delete();

       errorEmbed.setDescription('Professors/Facilitators/Staff Members only have the authority to use this command.')
       message.author.send({ embeds: [errorEmbed] }).catch(e => {})
   }
}

module.exports.command = {
    name: "bslock",
    aliases: []
}