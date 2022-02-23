const { textId, parentId, rolesId } = require('../../variablehandler.js')
const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message, args, prefix) => {
    if(message.member.permissions.has("MANAGE_ROLES") || message.member.roles.cache.has(rolesId.staff)) {
        if (message.channel.parent.id === parentId.verification){
            if(message.channel.id === textId.verify) return message.delete()
            await message.react('✅')
            await message.channel.send("**The channel will be closed in five seconds.**")
            const messages = await message.channel.messages.fetch()
            const arrayMessages = await messages.filter(msg => !msg.length).reverse()
            const text = await arrayMessages.map(m=>`${m.author.tag}: ${m.content}`).join("\n")
            const logChannel = await client.channels.cache.get(textId.verifylog)
            await logChannel.send({ 
                content: `\`\`\`\n${text}\`\`\``,
                embeds: [
                    new MessageEmbed()
                    .setColor('#00FF00')
                    .setDescription(`Ticket closed upon staff decision.`)
                ]
            })
            setTimeout(() => {
                message.channel.delete()
            }, 5000)
        } else return console.log(`${message.author.tag} executed in a non-verification ticket.`)
    } else {
        message.delete();
        const inaccessEmbed = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription('You are not a staff member authorized to use this command.')
        message.author.send({ embeds: [inaccessEmbed] }).catch(e => {})
    }
}

module.exports.command = {
    name: "closeverify",
    aliases:[]
}