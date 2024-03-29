const { textId, parentId, rolesId } = require('../../variablehandler.js');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (client, message, args, prefix) => {
    const modcheck = message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("BAN_MEMBERS")
    if(modcheck) {
        if (message.channel.parent.id === parentId.jail){
            if(message.channel.id === textId.jailedRules) return message.delete()
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
                const logChannel = client.channels.cache.get(textId.jailLog)
            if(text.length >= 2000) {
                const timestamp = await moment().format("M-D-YYYY, HH:mm")
                const fileAttach = new MessageAttachment(Buffer.from(text), `JailLog - ${timestamp}.txt`)
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
        try {
            message.author.send({ embeds: [
                new MessageEmbed()
                .setDescription("❌ | You are not a staff member authorized to use this command.")
                .setColor("#ff0000")
            ]})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports.command = {
    name: "closejail",
    aliases:[]
}