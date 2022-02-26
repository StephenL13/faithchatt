const { textId, parentId, rolesId } = require('../../variablehandler.js')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
module.exports.run = async (client, message, args, prefix) => {
    if(message.member.permissions.has("MANAGE_ROLES") || message.member.roles.cache.has(rolesId.staff)) {
        if (message.channel.parent.id === parentId.jail){
            if(message.channel.id === textId.jailcmds) return message.delete()
            const messages = await message.channel.messages.fetch();
            const arrayMessages = await messages.filter(msg => !msg.length).reverse();
            const text = await arrayMessages.map(m=>`${m.author.tag}: ${m.content}`).join("\n")
            const logChannel = client.channels.cache.get(textId.jailLog)
            if(text.length >= 2000) {
                const timestamp = await moment().format("M-D-YYYY, HH:mm")
                const fileAttach = new MessageAttachment(Buffer.from(text), `VerifyLog - ${timestamp}.txt`)
                await logChannel.send({
                    content: "Channel is over 2000 characters. Thus, a generated file.",
                    files: [fileAttach],
                    embeds: [
                        new MessageEmbed()
                        .setColor('#ffd100')
                        .setDescription(`Jailed member has left the server or was immediately closed under the custom staff decision.`)
                    ]
                })
            } else {
                await logChannel.send({ 
                    content: `\`\`\`\n${text}\`\`\``,
                    embeds: [
                        new MessageEmbed()
                        .setColor('#ffd100')
                        .setDescription(`Jailed member has left the server or was immediately closed under the custom staff decision.`)
                    ]
                })
            }
            await message.react('✅')
            await message.channel.send("**The channel will be closed in five seconds.**")
            setTimeout(() => {
                message.channel.delete()
            }, 5000)
        } else return console.log(`${message.author.tag} executed in a non-jail ticket.`)
    } else {
        message.delete();
        const inaccessEmbed = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription('You are not a staff member authorized to use this command.')
        message.author.send({ embeds: [inaccessEmbed] }).catch(e => {})
    }
}

module.exports.command = {
    name: "closejail",
    aliases:[]
}