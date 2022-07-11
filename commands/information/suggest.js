const { textId } = require('../../variablehandler') 
const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args, prefix) => {
    const textChannel = client.channels.cache.get(textId.suggest)
    const suggestion = args.join(" ")
    if(!suggestion) return message.reply({ content: "Please enter your query.\`" }).catch(err => {})
    await message.delete();
    await message.author.send({ content: "**Your suggestion has been sent!**", ephemeral: true }).catch(e=>console.log(e)).then(async(m) => {
        setTimeout(async() => {
            await m.delete()
        }, 5000)
    }).catch(e => {})
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
    name: `suggest`, 
    aliases: [] 
}