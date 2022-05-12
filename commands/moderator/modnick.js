const { MessageEmbed } = require('discord.js');
const { nicknameSet } = require(`../../variables/MiscValues.js`)
module.exports.run = async(client, message, args, prefix) => {
    let targetmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    var num1 = Math.floor(Math.random()*nicknameSet.length);
    var num2 = Math.floor(Math.random()*nicknameSet.length);
    const modCheck = message.member.permissions.has("MANAGE_NICKNAMES")
    if(!modCheck) return message.delete().then(() => {
        try {
            message.author.send({ embeds: [
                new MessageEmbed()
                .setDescription("❌ | You are not a staff member authorized to use this command.")
                .setColor("#ff0000")
            ]})
        } catch (error) {
            console.log(error)
        }
    })
    if(!targetmember) {
        return message.delete().then(() => {
            try {
                message.channel.send({ embeds: [
                    new MessageEmbed()
                    .setDescription("❌ | You must mention a user to change their nickname.")
                    .setColor("#ff0000")
                ]}).then(m => setTimeout(() => m.delete().catch(() => {}), 5000))
            } catch (error) {
                console.log(error)
            }
        })
    } else {
        await targetmember.setNickname(nicknameSet[num1]+nicknameSet[num2])
        return message.react("✅").then(async() => {
            try {
                await setTimeout(() => message.delete().catch(() => {}), 3000)
                await message.channel.send({ embeds: [
                    new MessageEmbed()
                    .setDescription(`✅ | **${targetmember.user.tag}**'s nickname has been generated and changed!`)
                    .setColor("#00ff00")
                ]})
            } catch (error) {
                console.log(error)
            }
        })
    }
}

module.exports.command = {
    name: "modnick",
    aliases: ["mnick"]
}