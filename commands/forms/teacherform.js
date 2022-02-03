const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.run = async(client, message, args, prefix) => {
    const link = new MessageActionRow().addComponents(
        new MessageButton()
            .setLabel("Click to start filling the forms!")
            .setStyle("LINK")
            .setEmoji("📝")
            .setURL("https://forms.gle/JfjVJN6XVzDoYCwZ9")
            .setDisabled("false"),
    );
    const embed = new MessageEmbed()
        .setTitle("Professor/Facilitators Application Form")
        .setDescription("Please fill in this application form to become a **Professor** or **Facilitator**. One of the staff team will let you know the details.")
        .setThumbnail("https://cdn.discordapp.com/attachments/855630577105502228/904092673353334884/FaithChatt_Halo.png")
        .setColor("#ffd100")
        .setFooter({ text:"© FaithChatt Forum" });
    await message.channel.send({ embeds: [embed], components: [link] })
}

module.exports.command = {
    name: "teacherform",
    aliases: []
}