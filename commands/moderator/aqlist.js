const { MessageEmbed } = require('discord.js')
const schema = require('../../model/aqblacklist.js')
module.exports.run = async(client, message, args, prefix) => {
    const modcheck = message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("BAN_MEMBERS")
    let data = await schema.find({})

    async function aqListEvent() {    
        const content = data.map((user) => {
            return `${user.userName} | ${user.userId}`
        }).join('\n')

        const embed = new MessageEmbed()
            .setColor('#ffd100')
            .setDescription(content)
        await message.channel.send({ embeds: [embed] })
        const emptyEmbed = new MessageEmbed()
            .setColor('#ffd100')
            .setDescription('There are no more blacklisted users.')
    }

    if (modcheck) {
        if (!data?.length) return message.channel.send({ embeds: [emptyEmbed] })
        await aqListEvent();
    } else {
        await message.delete();
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
    name: `aqlist`, 
    aliases: [] 
}