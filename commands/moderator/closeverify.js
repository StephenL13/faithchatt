const { textId, parentId, rolesId } = require('../../variablehandler.js')
const Discord = require('discord.js')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const schema = require('../../model/ticket.js')
const moment = require('moment')
module.exports.run = async (client, message, args, prefix) => {
    const modcheck = message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("BAN_MEMBERS")
    if(modcheck) {
        if (message.channel.parent.id === parentId.verification){
            if(message.channel.id === textId.verify) return message.delete()
            let unvMem = message.guild.members.cache.get(message.channel.topic)
            async function logAction() {
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
                    async function alreadyMem() {
                        const alreadyEmbed = new MessageEmbed()
                        .setColor('#FF0000')
                        .setDescription(`👤 **User:** \`${unvMem.user.tag}\`\n📜 **ID:** \`${unvMem.user.id}\`\n\nMember has been already verified.`)
                        .setThumbnail(unvMem.user.displayAvatarURL())
                        await console.log("Member has been already verified.")
                        if(text.length >= 2000) {
                            const timestamp = await moment().format("M-D-YYYY, HH:mm")
                            const fileAttach = new MessageAttachment(Buffer.from(text), `VerifyLog - ${timestamp}.txt`)
                            await logChannel.send({
                                content: "Channel is over 2000 characters. Thus, a generated file.",
                                files: [fileAttach],
                                embeds: [alreadyEmbed]
                            })
                        } else {
                            await logChannel.send({ 
                                content: `\`\`\`\n${text}\`\`\``,
                                embeds: [alreadyEmbed]
                            })
                        }
                    }
                    if (unvMem.roles.cache.has(rolesId.member)) return alreadyMem();
                    const closeEmbed = new MessageEmbed()
                    .setColor('#FF0000')
                    .setDescription(`👤 **User:** \`${unvMem.user.tag}\`\n📜 **ID:** \`${unvMem.user.id}\`\n\nMember has failed to accomplish the verification, upon the decision of the staff.`)
                    .setThumbnail(unvMem.user.displayAvatarURL())
                    await unvMem.send({ embeds: [
                        new MessageEmbed()
                            .setTitle("Verification ticket has been closed.")
                            .setDescription(`Staff member has decided to close the ticket for the following reasons:\n- A set of questions are not answered or ticket hasn't been active.\n- Bot has been offline due to a bug.\n\nTo re-apply, be sure to re-read the rules and click "Verify Here". Thank you.`)
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
                    .setDescription(`Staff has closed the verification ticket. Member left the server due to either inactivity or the bot was offline.`)
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
            try {
                await schema.findOne({ userId: unvMem.id }).then(async() => {
                    await schema.deleteOne({ userId: unvMem.id })
                });
            } catch (error) { 
                console.log(error) 
            }
            await message.react('✅')
            await message.channel.send("**The channel will be closed in five seconds.**")
            setTimeout(async() => {
                message.channel.delete()
            }, 5000)
        } else return console.log(`${message.author.tag} executed in a non-verification ticket.`)
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
    name: "closeverify",
    aliases:[]
}