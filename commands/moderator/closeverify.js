const { textId, parentId, rolesId } = require('../../variablehandler.js')
const Discord = require('discord.js')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const moment = require('moment')
module.exports.run = async (client, message, args, prefix) => {
    if(message.member.permissions.has("MANAGE_ROLES") || message.member.roles.cache.has(rolesId.staff)) {
        if (message.channel.parent.id === parentId.verification){
            if(message.channel.id === textId.verify) return message.delete()
            async function logAction() {
                let unvMem = message.guild.members.cache.get(message.channel.topic)
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
                const logChannel = client.channels.cache.get(textId.verifyLog)
                const closeEmbed = new MessageEmbed()
                    .setColor('#FF0000')
                    .setDescription(`👤 **User:** \`${unvMem.user.tag}\`\n📜 **ID:** \`${unvMem.user.id}\`\n\nMember has failed to accomplished the verification, upon the decision of the staff.`)
                    .setThumbnail(unvMem.user.displayAvatarURL())
                if(text.length >= 2000) {
                    const timestamp = await moment().format("M-D-YYYY, HH:mm")
                    const fileAttach = new MessageAttachment(Buffer.from(text), `VerifyLog - ${timestamp}.txt`)
                    await logChannel.send({
                        content: "Channel is over 2000 characters. Thus, a generated file.",
                        files: [fileAttach],
                        embeds: [closeEmbed]
                    })
                } else {
                    await logChannel.send({ 
                        content: `\`\`\`\n${text}\`\`\``,
                        embeds: [closeEmbed]
                    })
                }
            }

            logAction()
            await message.react('✅')
            await message.channel.send("**The channel will be closed in five seconds.**")
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