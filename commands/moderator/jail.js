const { textId, parentId, rolesId } = require('../../variablehandler.js')
const { MessageEmbed } = require('discord.js')
const schema = require('../../model/jailsystem.js')
module.exports.run = async (client, message, args, prefix) => {
    if(!message.member.permissions.has("BAN_MEMBERS")) return message.author.send({
        embeds: [new MessageEmbed()
        .setColor("#ff0000")
        .setDescription('❌ You are not a staff member authorized to use this command.')]
    }).catch(e => {})
    let targetmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ")
    const memberrole = message.guild.roles.cache.get(rolesId.member)
    const regularrole = message.guild.roles.cache.get(rolesId.regular)
    const usherrole = message.guild.roles.cache.get(rolesId.usher)
    const prayerwarrior = message.guild.roles.cache.get(rolesId.prayerwarrior)
    const fisherofmen = message.guild.roles.cache.get(rolesId.fisherofmen)
    const languagechat = message.guild.roles.cache.get(rolesId.chatlanguage)
    const topicchat = message.guild.roles.cache.get(rolesId.chattopics)
    const videogameschat = message.guild.roles.cache.get(rolesId.chatvideogames)

    const legalrole = message.guild.roles.cache.get(rolesId.legal)
    const underagerole = message.guild.roles.cache.get(rolesId.underage)
    const malerole = message.guild.roles.cache.get(rolesId.male)
    const femalerole = message.guild.roles.cache.get(rolesId.female)

    const mutedrole = message.guild.roles.cache.get(rolesId.muted)
    const unverified = message.guild.roles.cache.get(rolesId.unverified)
    const everyone = message.guild.roles.cache.find(r => r.name === "@everyone")
    const modlog = message.guild.channels.cache.get(textId.modLog)

    const moderatorrole = message.guild.roles.cache.get(rolesId.moderator)

    if(!targetmember) return message.channel.send("Command usage:\n`!jail <@user/uid> <reason>`")
    if(targetmember.roles.cache.has(rolesId.muted)) return message.reply("The member has been already jailed!")
    if(!reason) return message.channel.send("Please supply a reason of the suspect.\n`!jail <@user/uid> <reason>`")

    // If a mod has met the prerequisites...

    let data = await schema.findOne({ userId: targetmember.user.id })
    if(!data) {
        await message.delete().catch(err => console.log(err))
        await targetmember.roles.add(mutedrole).catch(e=>{})
        await targetmember.roles.remove(unverified).catch(e=>{})
        await targetmember.roles.remove(memberrole).catch(e=>{})
        await targetmember.roles.remove(regularrole).catch(e=>{})
        await targetmember.roles.remove(usherrole).catch(e=>{})
        await targetmember.roles.remove(prayerwarrior).catch(e=>{})
        await targetmember.roles.remove(fisherofmen).catch(e=>{})
        await targetmember.roles.remove(malerole).catch(e=>{})
        await targetmember.roles.remove(femalerole).catch(e=>{})
        await targetmember.roles.remove(legalrole).catch(e=>{})
        await targetmember.roles.remove(underagerole).catch(e=>{})
        await targetmember.roles.remove(languagechat).catch(e=>{})
        await targetmember.roles.remove(topicchat).catch(e=>{})
        await targetmember.roles.remove(videogameschat).catch(e=>{})

        let ticketname = targetmember.user.tag
        let jailchannel = await message.guild.channels.create("jail-"+ticketname, {
            type: "GUILD_TEXT",
            parent: parentId.jail,
            topic: targetmember.user.id,
            permissionOverwrites: [
                { id: targetmember.user.id, allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"], deny: ["MANAGE_CHANNELS", "EMBED_LINKS", "ATTACH_FILES", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "CREATE_INSTANT_INVITE", "SEND_MESSAGES_IN_THREADS", "MANAGE_THREADS", "MANAGE_MESSAGES", "USE_EXTERNAL_EMOJIS", "USE_EXTERNAL_STICKERS", "USE_APPLICATION_COMMANDS", "MANAGE_WEBHOOKS", "MANAGE_ROLES", "SEND_TTS_MESSAGES"] },
                { id: mutedrole.id, deny: ["EMBED_LINKS", "ATTACH_FILES"] },
                { id: memberrole.id, deny: ["VIEW_CHANNEL"] },
                { id: moderatorrole.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"] },
                { id: everyone.id, deny: ["VIEW_CHANNEL"] }
            ]
        })

        data = await schema.create({
            userId: targetmember.user.id,
            userName: targetmember.user.tag,
            textChannel: jailchannel.id
        })

        console.log(`🚨 Member has been jailed:\nMember: ${targetmember.user.tag}\nReason: ${reason}`)
        const channelembed = new MessageEmbed()
            .setTitle("You have been jailed!")
            .setDescription(`👤 **User:** \`${targetmember.user.tag}\`\n🔒 **Reason:** \`${reason}\`\n\nYou have been restricted access to all channels as of the moment. Leaving and rejoining the server to bypass the mute will result into a permanent sanction.`)
            .setFooter({ text: `UID: ${targetmember.user.id}` })
            .setColor('#ff0000')
        await message.react('🔒').then(() => {
            targetmember.send({ embeds: [
                new MessageEmbed()
                .setTitle("You have been jailed!")
                .setDescription(`👤 **User:** \`${targetmember.user.tag}\`\n🔒 **Reason:** \`${reason}\`\n\nYou have been restricted access to all channels as of the moment. Thus, a jail ticket is created for you. ${jailchannel}`)
                .setFooter({ text: `UID: ${targetmember.user.id}` })
                .setColor('#ff0000')
            ] }).catch(() => {})
        }).catch(() => {})
        await message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription(`🔒 **${targetmember.user.tag}** has been jailed!`)
                .setFooter({ text: `UID: ${targetmember.user.id}` })
                .setColor('#ff0000')
        ] })
        await modlog.send({ embeds: [
            new MessageEmbed()
                .setDescription(`👤 **User:** \`${targetmember.user.tag}\`\n\`${targetmember.user.id}\`\n🔒 **Reason:** \`${reason}\`\n\n👮‍♂️ **Moderator**: \`${message.author.tag}\``)
                .setFooter({ text: `Moderator UID: ${message.author.id}` })
                .setColor('#ff0000')
        ] })
        data.save()
        await jailchannel.send({ content: `${targetmember}`, embeds: [channelembed] }).catch(e=>{})
    } else if (!message.guild.channel.cache.has(data.textChannel)) {
        let ticketname = targetmember.user.tag
        let jailchannel = await message.guild.channels.create("jail-"+ticketname, {
            type: "GUILD_TEXT",
            parent: parentId.jail,
            topic: targetmember.user.id,
            permissionOverwrites: [
                { id: targetmember.user.id, allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"], deny: ["MANAGE_CHANNELS", "EMBED_LINKS", "ATTACH_FILES", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "CREATE_INSTANT_INVITE", "SEND_MESSAGES_IN_THREADS", "MANAGE_THREADS", "MANAGE_MESSAGES", "USE_EXTERNAL_EMOJIS", "USE_EXTERNAL_STICKERS", "USE_APPLICATION_COMMANDS", "MANAGE_WEBHOOKS", "MANAGE_ROLES", "SEND_TTS_MESSAGES"] },
                { id: mutedrole.id, deny: ["EMBED_LINKS", "ATTACH_FILES"] },
                { id: memberrole.id, deny: ["VIEW_CHANNEL"] },
                { id: moderatorrole.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"] },
                { id: everyone.id, deny: ["VIEW_CHANNEL"] }
            ]
        })
        data.textChannel = jailchannel.id;
        await data.save()
    }

}

module.exports.command = {
    name: "jail",
    aliases: ["arrest"]
}