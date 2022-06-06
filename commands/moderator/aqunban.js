const { MessageEmbed } = require('discord.js')
const schema = require('../../model/aqblacklist.js')
module.exports.run = async(client, message, args, prefix) => {
    const modcheck = message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("BAN_MEMBERS")
    const targetmember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    const aqMissingTargetEmbed = new MessageEmbed()
        .setColor('ORANGE')
        .setDescription('Specify a user!') 
    const aqUnbanEmbed = new MessageEmbed()
        .setColor('#00ff00')
        .setDescription(`✅ | **${targetmember.user.tag}** has been removed from Any Questions blacklist.`)
    const aqUnbanExists = new MessageEmbed()
        .setColor('#00ff00')
        .setDescription(`The member has already been removed from blacklist.`)

    async function aqUnbanEvent() {
        let data = await schema.findOne({ userId: targetmember.user.id })
        if(data) {
            await schema.deleteOne({ userId: targetmember.user.id })
            await message.delete();
            await message.channel.send({ embeds: [aqUnbanEmbed] })
        } else {
            await message.delete();
            await message.channel.send({ embeds: [aqUnbanExists] })
        }
    }

    if (modcheck) {
        if (!targetmember) return message.delete()
            .then(() => message.channel.send({ embeds: [aqMissingTargetEmbed] }))
            .catch(error => console.log(error));
        await aqUnbanEvent();
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
    name: `aqunban`, 
    aliases: [] 
}