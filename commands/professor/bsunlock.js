const { MessageEmbed } = require('discord.js')
const professorRole = '843151409167073350'
const facilitatorRole = '903033680497365033'
const bstext = '839953010142871552'

module.exports.run = async(client, message, args, prefix) => {
    const errorEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setFooter({ text: '© FaithChatt Forum' });
    const successEmbed = new MessageEmbed()
        .setColor("#ffff00")
        .setDescription("<:Staged:880649462492569651> Session is about to start in a few moments.\nHead over to <#840942889340239914> and study the Word with us!")
        .setFooter({ text:"© FaithChatt Forum" });
    if(message.member.roles.cache.has({ professorRole, facilitatorRole }) || message.member.permissions.has("MANAGE_ROLES")) {
        if(message.channel.id === bstext){
            message.channel.permissionOverwrites.edit(message.guild.id, {
                "SEND_MESSAGES": null
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
    name: "bsunlock",
    aliases: []
}