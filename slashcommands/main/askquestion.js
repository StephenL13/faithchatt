const { MessageEmbed } = require('discord.js')
const { textId } = require('../../variablehandler.js')
const moment = require('moment')
module.exports.run = async (client, interaction) => {
    const slashCmdString = interaction.options.getString("text")
    const textChannel = client.channels.cache.get(textId.askquestion)
    let simpledate = await moment().format('M-D-YYYY')

    await interaction.reply({ embeds: [
        new MessageEmbed()
        .setColor('#ffd100')
        .setTitle('Your question has been sent!')
        .setDescription('*NOTE: Should there be any submissions that is against the rules, it will be removed immediately.*')
    ], ephemeral: true }).catch(e=>console.log(e))
    let output = await textChannel.send({ content: `${interaction.user}`, embeds: [
        new MessageEmbed()
        .setColor('#ffd100')
        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
        .setTitle("A new question has been submitted!")
        .setDescription(slashCmdString)
        .setFooter({ text: "© FaithChatt Forum" })
    ]})
    let msgfetch = await textChannel.messages.fetch(output.id)
    let newThread = await msgfetch.startThread({
        name: `${interaction.user.username} | ${simpledate}`,
        autoArchiveDuration: 1440,
        rateLimitPerUser: 5
    })
    newThread.members.add('394019914157129728')
    newThread.members.add('204255221017214977')
}

module.exports.command = {
    name: "askquestion"
}