const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, message, args, prefix) => {
    const messages = await message.channel.messages.fetch()
    const arrayMessages = await messages.filter(msg => !msg.length).reverse()
    const text = await arrayMessages.map(m=>`${m.author.tag}: ${m.content}`).join("\n")
    await message.channel.send({ content: `\`\`\`${text}\`\`\`` })
}

module.exports.command = {
    name: "logemit",
    aliases: []
}