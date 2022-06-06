const { MessageEmbed } = require('discord.js')
const schema = require('../../model/aqblacklist.js')
module.exports.run = async(client, message, args, prefix) => {
    const modcheck = message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("BAN_MEMBERS")

    async function aqListEvent() {
        let data = await schema.find({ userId: _id })
        
        const content = data.map((user) => {
            return `${user.userName} | ${user.userId}`
        }).join('\n')

        const embed = new MessageEmbed()
            .setColor('#ffd100')
            .setDescription(content)
        await message.channel.send({ embeds: [embed] })
    }

    if (modcheck) {
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