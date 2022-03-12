const { textId, parentId, rolesId } = require('../../variablehandler.js')
const Discord = require('discord.js')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const schema = require('../model/ticket.js')
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
                if(unvMem) {
                    const closeEmbed = new MessageEmbed()
                    .setColor('#FF0000')
                    .setDescription(`👤 **User:** \`${unvMem.user.tag}\`\n📜 **ID:** \`${unvMem.user.id}\`\n\nMember has failed to accomplish the verification, upon the decision of the staff.`)
                    .setThumbnail(unvMem.user.displayAvatarURL())
                    await unvMem.send({ embeds: [
                        new MessageEmbed()
                            .setTitle("Verification ticket has been closed due to inactivity.")
                            .setDescription(`To re-apply, be sure to re-read the rules and click "Verify Here". Thank you.`)
                            .setColor("#FF0000")
                            .setFooter({ text: "© FaithChatt Forum" })
                    ] }).catch(e=>{})
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
                } else {
                    const closeEmbed = new MessageEmbed()
                    .setColor('#FF0000')
                    .setDescription(`Member has left the server and failed to accomplish the verification. Ticket was closed manually.`)
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
            }

            logAction()
            await message.react('✅')
            await message.channel.send("**The channel will be closed in five seconds.**")
            setTimeout(async() => {
                try {
                    await schema.findOne({ userId: unvMem.user.id }).then(async() => {
                        await schema.deleteOne({ userId: unvMem.user.id })
                    });
                } catch (error) { 
                    console.log(error) 
                }
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