const faithchatt = require('../../variablehandler')
const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, interaction) => {
    const slashCmdString = interaction.options.getstring("text")
    const textChannel = client.channels.cache.get(faithchatt.textId.suggest)

    await interaction.reply({ content: "**Your suggestion has been sent!**", ephemeral: true }).catch(e=>console.log(e))
    await textChannel.send({ embeds: [
        new MessageEmbed()
        .setColor('#ffd100')
        .setAuthor({ name: `${interaction.user.tag} suggests:`, iconURL: interaction.user.displayAvatarURL() })
        .setDescription(slashCmdString)
        .setFooter({ text: "© FaithChatt Forum" })
    ] }).then(m => {
        m.react("<:thumb_green:918899980423544843>")
        m.react("<:thumb_red:918899980377411634>")
        m.react("❔")
    })
}

module.exports.command = {
    name: "suggest"
}