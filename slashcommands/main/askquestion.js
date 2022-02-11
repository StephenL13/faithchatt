const moment = require('moment')
module.exports.run = async (client, interaction) => {
    const slashCmdString = interaction.options.getString("text")
    const textChannel = client.channels.cache.get("839724682134683649")
    let simpledate = await moment().format('l')

    await interaction.reply({ content: "**Your question has been sent!**\n\n*NOTE: If this *"})
    await textChannel.send({ embeds: [
        new MessageEmbed()
        .setColor('#ffd100')
        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
        .setTitle("A new question has been submitted!")
        .setDescription(slashCmdString)
        .setFooter({ text: "© FaithChatt Forum" })
    ]}).startThread({
        name: `${interaction.user.username} | ${simpledate}`,
        autoArchiveDuration: 1440,
        rateLimitPerUser: 10
    })
}

module.exports.command = {
    name: "askquestion"
}