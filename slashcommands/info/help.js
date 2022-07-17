const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, interaction) => {
    await interaction.reply({ embeds: [
        new MessageEmbed()
        .setColor("#ffd100")
        .setTitle("The setlist of commands")
        .setDescription("**GENERAL USE**\n`!help` - This list\n`!ping` - Server ping\n`!membercount` - Human member count\n`!invite` - Server invite\n\n**APPLICATION FORMS**\n`!moderatorform` `!adminform`\n`!teacherform` `!partnerform`\n\n**SLASH COMMANDS**\n`/membercount` - Human member count\n`/pray` - Submit a prayer request")
        .setFooter({ text:"© FaithChatt Forum" })
    ], ephemeral: true })
}

module.exports.command = {
    name: "help"
}