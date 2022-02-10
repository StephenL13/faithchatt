const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, interaction) => {
    const fclogo = "https://cdn.discordapp.com/attachments/855630577105502228/904092673353334884/FaithChatt_Halo.png"
    const slashcmdstringtext = interaction.options.getString('text')
    const embed = new MessageEmbed()
        .setColor('#ffd100')
        .setTitle("Anonymous prayer request")
        .setAuthor({ name: "AnonymousUser#1234", iconURL: fclogo })
        .setDescription(slashcmdstringtext)
        .setFooter({ text: "© FaithChatt Forum" })
    await interaction.reply({ content: "Anonymous prayer sent!", ephemeral: true })
    await client.channels.cache.get('839722222162804736').send({ embeds: [embed] })
}

module.exports.command = {
    name: "pray"
}