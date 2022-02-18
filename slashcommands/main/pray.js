const { MessageEmbed } = require('discord.js')
const { textId, rolesId } = require('../../variablehandler.js')

module.exports.run = async (client, interaction) => {
    const praylogo = "https://i.pinimg.com/originals/cf/46/d3/cf46d3c5d059e2e802faa904686d3bfc.png"
    
    const slashCmdString = interaction.options.getString("text")
    const pingPrayerWarrior = interaction.options.getBoolean("ping")
    const textChannel = client.channels.cache.get(textId.prayer)
    const roleIdPrayerWarrior = rolesId.prayerwarrior

    const embed = new MessageEmbed()
        .setColor('#ffd100')
        .setAuthor({ name: "A new anonymous prayer request has been sent!" })
        .setThumbnail(praylogo)
        .setDescription(slashCmdString)
        .setFooter({ text: "© FaithChatt Forum" })
    await interaction.reply({ content: "**Your anonymous prayer request has been sent!**", ephemeral: true })
    switch (pingPrayerWarrior) {
        case true: {
            await textChannel.send({ content:`<@&${roleIdPrayerWarrior}>`, embeds: [embed] })
        } break;
        case false: {
            await textChannel.send({ embeds: [embed] })
        } break;
    }
}

module.exports.command = {
    name: "pray"
}