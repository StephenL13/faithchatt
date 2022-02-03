const { MessageEmbed } = require('discord.js')
const professorRole = '843151409167073350'
const facilitatorRole = '903033680497365033'
const bstext = '839953010142871552'

module.exports.run = async(client, message, args, prefix) => {
    const errorEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setFooter('© FaithChatt Forum');
    const successEmbed = new MessageEmbed()
        .setColor("#00FF00")
        .setDescription("<:Unstaged:880650957925519441> **Bible study channel is now locked.**\n\nTune in next time by [checking out our schedules](https://discord.com/channels/839708279973478430/839718408115191849/926988291650224168) on <#839718408115191849>. Thanks for joining with us. God bless you.")
        .setFooter("© FaithChatt Forum");
   
    if(message.member.roles.cache.has({ professorRole, facilitatorRole }) || message.member.permissions.has("MANAGE_ROLES")) {
        if(message.channel.id === bstext){
            message.channel.permissionOverwrites.edit(message.guild.id, {
                "SEND_MESSAGES": null
            })
            
            successEmbed.setDescription("<:Staged:880649462492569651> **Bible study channel is now unlocked!**\n\nSession is about to start in a few moments. Head over to <#839912018831474699> and study the Word with us!")
            successEmbed.setColor("#FFFF00")
            message.channel.send({ embeds: [successEmbed] })
        } else {
            message.delete()

            errorEmbed.setDescription('This command is only accessible to the Bible Study/Sermon Text Chatt.')
            message.author.send({ embeds: [errorEmbed] })
        }

   } else {
       message.delete();

       errorEmbed.setDescription('Professors/Facilitators/Staff Members only have the authority to use this command.')
       message.author.send({ embeds: [errorEmbed] })
   }
}

module.exports.command = {
    name: "bsunlock",
    aliases: []
}