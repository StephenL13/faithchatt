const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.run = async(client, message, args, prefix) => {
    const link = new MessageActionRow().addComponents(
        new MessageButton()
            .setLabel("Click to start filling the forms!")
            .setStyle("LINK")
            .setEmoji("📝")
            .setURL("https://forms.gle/QRiegE474GFYG6as5")
            .setDisabled("false"),
    );
    const embed = new MessageEmbed()
        .setTitle("Moderator Application Form")
        .setDescription("To become an **Moderator**, please fill in this application form. One of the staff team will let you know the details.")
        .setThumbnail("https://cdn.discordapp.com/attachments/855630577105502228/904092673353334884/FaithChatt_Halo.png")
        .setColor("#ffd100")
        .setFooter({ text:"© FaithChatt Forum" });
    await message.author.send({ embeds: [embed], components: [link] }).catch(e=>{message.reply("**❌ Notice: Your DMs are closed!**S").catch(e=>{})})
}

module.exports.command = {
    name: "moderatorform",
    aliases: []
}