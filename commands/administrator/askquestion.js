const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
module.exports.run = async(client, message, args, prefix) => {
    if(!message.author.id == '881154349248704592') return message.delete();
    const button = new MessageButton()
        .setCustomId('askquestion-interaction')
        .setDisabled(false)
        .setLabel('Click here to ask a question!')
        .setEmoji('📖')
        .setStyle('PRIMARY')
    const row = new MessageActionRow()
        .addComponents(button)
    await message.channel.send({
        embeds: [
            new MessageEmbed()
            .setDescription('Please post any questions you have about faith, life, or whatever here. The \`@Professors\` and \`@Facilitators\` also assure to keep on stand-by addressing theological concerns and anything related to Christian life.')
            .setColor('#ffd100')
        ],
        components: [row]
    })
}
module.exports.command = {
    name: `askquestion`, 
    aliases: [] 
}