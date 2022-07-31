const { textId, parentId, rolesId } = require('../../variablehandler.js');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const schema = require('../model/jailsystem.js')
const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (client, message, args, prefix) => {
    if(message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("BAN_MEMBERS")) {
        let targetmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const memberrole = message.guild.roles.cache.get(rolesId.member)
        const mutedrole = message.guild.roles.cache.get(rolesId.muted)
        const modcheck = message.member.roles.cache.has(rolesId.moderator)
        const generalChat = client.channels.cache.get(textId.general)

        if (!modcheck) return message.delete().then(() => {
            try {
                message.author.send({ embeds: [
                    new MessageEmbed()
                    .setDescription("❌ | You are not a staff member authorized to use this command.")
                    .setColor("#ff0000")
                ]})
            } catch (error) {
                console.log(error)
            }
        }).catch(err => {})
        if(!targetmember) return message.channel.send("Command usage:\n`!unjail <@user/uid>`");
        if (message.channel.parent.id === parentId.jail){
            let data = await schema.findOne({ userId: targetmember.user.id})
            if(!data) {
                await schema.deleteOne({ userId: targetmember.user.id})

                // the unjail action
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
                            .setDescription(`👤 **User:** \`${targetmember.user.tag}\`\n📜 **ID:** \`${targetmember.user.id}\``)
                            .setThumbnail(targetmember.user.displayAvatarURL())
                        ]
                    })
                } else {
                    await logChannel.send({ 
                        content: `\`\`\`\n${text}\`\`\``,
                        embeds: [
                            new MessageEmbed()
                            .setColor('#ffd100')
                            .setDescription(`👤 **User:** \`${targetmember.user.tag}\`\n📜 **ID:** \`${targetmember.user.id}\``)
                            .setThumbnail(targetmember.user.displayAvatarURL())
                        ]
                    })
                }
                await message.react('✅')
                await message.channel.send("**Member unjailed! The channel will be closed in five seconds.**")
                setTimeout(() => {
                    const welcomeBack = new MessageEmbed()
                    .setColor('#ffd100')
                    .setDescription(`${targetmember.user} has been unjailed!`)
                    targetmember.roles.remove(mutedrole).catch(e=>{});
                    targetmember.roles.add(memberrole).catch(e=>{})
                    message.channel.delete()
                    generalChat.send({ embeds: [welcomeBack] })
                }, 5000)
            }
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
    name: "unjail",
    aliases:["bail"]
}