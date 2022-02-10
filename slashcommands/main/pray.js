const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, interaction) => {
    const praylogo = "https://i.pinimg.com/originals/cf/46/d3/cf46d3c5d059e2e802faa904686d3bfc.png"
    
    const slashcmdstringtext = interaction.options.getString("text")
    const pingprayerwarrior = interaction.options.getBoolean("ping")

    const embed = new MessageEmbed()
        .setColor('#ffd100')
        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
        .setThumbnail(praylogo)
        .setDescription(slashcmdstringtext)
        .setFooter({ text: "© FaithChatt Forum" })
    await interaction.reply({ content: "**Your prayer request has been sent!**", ephemeral: true })
    switch (pingprayerwarrior) {
        case true: {
            await client.channels.cache.get('839722222162804736').send({ content:"<@&844787634030772224>", embeds: [embed] })
        } break;
        case false: {
            await client.channels.cache.get('839722222162804736').send({ embeds: [embed] })
        } break;
    }
}

module.exports.command = {
    name: "pray"
}