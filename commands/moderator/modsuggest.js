const faithchatt = require('../../variablehandler')
const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, message, args, prefix) => {
    const staffPermCheck = message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("BAN_MEMBERS")
    const textChannel = client.channels.cache.get(faithchatt.textId.staffsuggest)
    const suggestion = args.join(" ")

    if(!staffPermCheck) return message.delete().then(async() => {
        try {
            message.author.send({ embeds: [
                new MessageEmbed()
                .setDescription("❌ | You are not a staff member authorized to use this command.")
                .setColor("#ff0000")
            ]})
        } catch (error) {
            console.log(error)
        }
    }).catch(e => {})
    if(!suggestion) return message.reply({ content: "Please enter your query."}).then(async(m) => {
        setTimeout(async() => {
            await m.delete()
        }, 5000)
    }).catch(e => {})
    await message.delete();
    await message.author.send({ content: "**Your staff-exclusive suggestion has been sent!**", ephemeral: true }).catch(e=>console.log(e))
    await textChannel.send({ embeds: [
        new MessageEmbed()
        .setColor('#ffd100')
        .setAuthor({ name: `${message.author.tag} suggests:`, iconURL: message.author.displayAvatarURL() })
        .setDescription(suggestion)
        .setFooter({ text: "© FaithChatt Forum" })
    ] }).then(m => {
        m.react("<:thumb_green:918899980423544843>")
        m.react("<:thumb_red:918899980377411634>")
        m.react("❔")
    })
    
}

module.exports.command = {
    name: "modsuggest",
    aliases: []
}