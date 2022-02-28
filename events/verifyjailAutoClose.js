const client = require(`../index.js`).client;
const faithchatt = require('../variablehandler.js'); // Lists all IDs of channels, categories, and roles
const Discord = require('discord.js');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const moment = require('moment');

client.on('guildMemberRemove', async member => {
    let memChannel = await member.guild.channels.cache.find(c => c.topic === `${member.id}`)
    if(memChannel) {
        if(memChannel.parentId === faithchatt.parentId.verification) {
            async function logAction() {
                let messageCollection = new Discord.Collection();
                let channelMessages = await memChannel.messages.fetch({ limit: 100 }).catch(err => console.log(err));
                messageCollection = await messageCollection.concat(channelMessages);
                while (channelMessages.size === 100) {
                    let lastMessageId = await channelMessages.lastKey();
                    channelMessages = await memChannel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
                    if (channelMessages) {
                        messageCollection = await messageCollection.concat(channelMessages);
                    };
                };
                let msgs = await messageCollection.filter(msg => !msg.length).reverse();
                const text = await msgs.map(m=>`${m.author.tag}: ${m.content}`).join("\n")
                const logChannel = client.channels.cache.get(faithchatt.textId.verifyLog)

                if(text.length >= 2000) {
                    const timestamp = await moment().format("M-D-YYYY, HH:mm")
                    const fileAttach = new MessageAttachment(Buffer.from(text), `VerifyLog - ${timestamp}.txt`)
                    await logChannel.send({ 
                        content: `Channel is over 2000 characters. Thus, a generated file.`,
                        files: [fileAttach],
                        embeds: [
                            new MessageEmbed()
                            .setColor('#FF0000')
                            .setDescription(`👤 **User:** \`${member.user.tag}\`\n📜 **ID:** \`${member.user.id}\`\n\nMember has left the server.`)
                            .setThumbnail(member.user.displayAvatarURL())
                        ]
                    })
                } else {
                    await logChannel.send({ 
                        content: `\`\`\`\n${text}\`\`\``,
                        embeds: [
                            new MessageEmbed()
                            .setColor('#FF0000')
                            .setDescription(`👤 **User:** \`${member.user.tag}\`\n📜 **ID:** \`${member.user.id}\`\n\nMember has left the server.`)
                            .setThumbnail(member.user.displayAvatarURL())
                        ]
                    })
                }
            }
            logAction()
            memChannel.send({ content: "**Member has left the server. Channel closes in five seconds.**" })
            setTimeout(() => {
                memChannel.delete()
            }, 5000)
        } else if(memChannel.parentId === faithchatt.parentId.jail) {
            if(member.roles.cache.has(faithchatt.rolesId.muted)) {
                memChannel.send({ content: `**A jailed member left. Staff has now the floor to implement for a decision.**\n\n\`${member.user.tag}\` - \`${member.user.id}\``}).catch(e => console.log(e))
            }
        }
    }
})