const Discord = require('discord.js')
const { MessageAttachment } = require('discord.js')
const moment = require('moment')

module.exports.run = async(client, message, args, prefix) => {
    if(message.author.id === "") {
        let messageCollection = new Discord.Collection();
        let channelMessages = await message.channel.messages.fetch({ limit: 100 }).catch(err => console.log(err));
        messageCollection = await messageCollection.concat(channelMessages);
        while (channelMessages.size === 100) {
            let lastMessageId = await channelMessages.lastKey();
            channelMessages = await message.channel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
            if (channelMessages) {
                messageCollection = await messageCollection.concat(channelMessages);
            };
        };
        let msgs = await messageCollection.filter(msg => !msg.length).reverse();
        const text = await msgs.map(m=>`${m.author.tag}: ${m.content}`).join("\n")

        if(text.length >= 2000) {
            const timestamp = await moment().format("M-D-YYYY, HH:mm")
            const fileAttach = new MessageAttachment(Buffer.from(text), `VerifyLog - ${timestamp}.txt`)
            await message.channel.send({ files: [fileAttach] })
        } else {
            await message.channel.send({ content: `\`\`\`\n${text}\`\`\``})
        }
    } else return message.delete()
}

module.exports.command = {
    name: "logemit",
    aliases: []
}