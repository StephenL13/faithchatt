const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.run = async(client, message, args, prefix) => {
    if(!message.author.id == "136292974379270144") {
        return message.reply(`You're not authorized to use this command.`)
    } else {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('verifyStart')
                .setLabel('Verify here!')
                .setEmoji('✅')
                .setStyle('SUCCESS')
                .setDisabled('false'),
            new MessageButton()
                .setURL('https://discord.com/channels/839708279973478430/839896314963296277/922492282928762890')
                .setLabel('Read the rules!')
                .setEmoji('📜')
                .setStyle('LINK')
                .setDisabled('false'),
            new MessageButton()
                .setURL('https://discord.com/channels/839708279973478430/843352934595166239/939068233988833300')
                .setLabel('Confidentiality Agreement')
                .setEmoji('😇')
                .setStyle('LINK')
                .setDisabled('false')
        );
        const embed = new MessageEmbed()
            .setTitle('Welcome to FaithChatt!')
            .setDescription('Thank you for joining us here on Discord. We are here to provide Bible studies to the entire world, fellowship with friends, Christian discipleship, and to share the gospel daily. Thanks for helping us proclaim the love of Jesus Christ virtually.\n\n**If you have problems with the verification ticket creation, immediately contact the moderators.**')
            .setThumbnail("https://cdn2.iconfinder.com/data/icons/unigrid-phantom-multimedia-vol-5/60/020_246_mail_email_envelope_message_ok_check_final_step_verification-512.png")
            .setImage('https://media1.giphy.com/media/z1kL3TjrK278E6EhZF/giphy.gif?cid=790b7611e06601e976e82fa774ae08ceab4bd86a1f6672ea&rid=giphy.gif&ct=g')
            .setFooter({ text: '© FaithChatt Forum' })
            .setColor('#ffd100')
        await message.channel.send({ embeds: [embed], components: [row] })
    }
}

module.exports.command = {
    name: "welcometicket",
    aliases: []
}