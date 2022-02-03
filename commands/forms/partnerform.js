const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.run = async(client, message, args, prefix) => {
    const link = new MessageActionRow().addComponents(
        new MessageButton()
            .setLabel("Click to start filling the forms!")
            .setStyle("LINK")
            .setEmoji("📝")
            .setURL("https://forms.gle/JSN4tbP9b8DMuGMS8")
            .setDisabled("false"),
    );
    const embed = new MessageEmbed()
        .setTitle("Server Partnership Application Form")
        .setDescription("To partner with **FaithChatt Forum**, please fill in this application form.  One of the staff team will let you know the details.")
        .setThumbnail("https://cdn.discordapp.com/attachments/855630577105502228/904092673353334884/FaithChatt_Halo.png")
        .setColor("#ffd100")
        .setFooter({ text:"© FaithChatt Forum" });
    await message.channel.send({ embeds: [embed], components: [link] })
}

module.exports.command = {
    name: "partnerform",
    aliases: []
}