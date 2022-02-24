const { MessageEmbed, MessageAttachment } = require('discord.js')
const moment = require('moment')

module.exports.run = async(client, message, args, prefix) => {
    const messages = await message.channel.messages.fetch()
    const arrayMessages = await messages.filter(msg => !msg.length).reverse()
    const text = await arrayMessages.map(m=>`${m.author.tag}: ${m.content}`).join("\n")
    if(text.length >= 2000) {
        const timestamp = await moment().format("M-D-YYYY, HH-mm")
        const fileAttach = new MessageAttachment(Buffer.from(text), `VerifyLog - ${timestamp}.txt`)
        await message.channel.send({
            content: "Channel is over 2000 characters. Thus, a generated file.",
            files: [fileAttach]
        })
    } else {
        await message.channel.send({ content: `\`\`\`${text}\`\`\`` })
    }
}

module.exports.command = {
    name: "logemit",
    aliases: []
}