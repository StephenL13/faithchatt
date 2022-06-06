const { MessageEmbed } = require('discord.js')
const schema = require('../../model/aqblacklist.js')
module.exports.run = async(client, message, args, prefix) => {
    const modcheck = message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("BAN_MEMBERS")
    const targetmember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    const aqMissingTargetEmbed = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription('Specify a user!') 
    const aqBanEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`⛔ | **${targetmember.user.tag}** has been blacklisted from the Any Questions access!`)
    const aqBanExists = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription(`The member has already been blacklisted!`)

    async function aqBanEvent() {
        let data = await schema.findOne({ userId: targetmember.user.id})
        if(!data) {
            data = await schema.create({ 
                userId: targetmember.user.id, userName: targetmember.user.name 
            })
            data.save();
            await message.delete();
            await message.channel.send({ embeds: [aqBanEmbed] })
        } else {
            await message.delete();
            await message.channel.send({ embeds: [aqBanExists] })
        }
    }

    if (modcheck) {
        if (!targetmember) return message.delete()
            .then(() => message.channel.send({ embeds: [aqMissingTargetEmbed] }))
            .catch(error => console.log(error));
        await aqBanEvent();
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
    name: `aqban`, 
    aliases: [] 
}