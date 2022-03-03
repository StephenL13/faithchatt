const { parentId, rolesId } = require('../../variablehandler.js')
const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message, args, prefix) => {
    if(message.member.permissions.has("MANAGE_ROLES")) {
        let targetmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ")
        const memberrole = message.guild.roles.cache.get(rolesId.member)
        const mutedrole = message.guild.roles.cache.get(rolesId.muted)
        const moderatorrole = message.guild.roles.cache.get(rolesId.staff)
        const everyone = message.guild.roles.cache.find(r => r.name === "@everyone")

        if(!message.member.roles.cache.has(rolesId.staff)) return message.delete().then(async() => {
            await message.author.send("You're not a staff member authorized to use this command.")
        }).catch(e => {})
        if(!targetmember) return message.channel.send("Command usage:\n`!jail <@user/uid> <reason>`")
        if(targetmember.roles.cache.has(rolesId.muted)) return message.reply("The member has been already jailed!")
        if(!reason) return message.channel.send("Please supply a reason of the suspect.\n`!jail <@user/uid> <reason>`")
        await targetmember.roles.add(mutedrole).catch(e=>{})
        await targetmember.roles.remove(memberrole).catch(e=>{})
        let ticketname = targetmember.user.tag
        let jailchannel = await message.guild.channels.create("jail-"+ticketname, {
            type: "GUILD_TEXT",
            parent: parentId.jail,
            topic: targetmember.user.id
        })
        await jailchannel.permissionOverwrites.set([
            { id: targetmember.user.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"], deny: ["EMBED_LINKS", "ATTACH_FILES"] },
            { id: mutedrole.id, deny: ["EMBED_LINKS", "ATTACH_FILES"] },
            { id: memberrole.id, deny: ["VIEW_CHANNEL"] },
            { id: moderatorrole.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"] },
            { id: everyone.id, deny: ["VIEW_CHANNEL"] }
        ])
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
        await jailchannel.send({ content: `${targetmember}`, embeds: [channelembed] }).catch(e=>{})
    } else {
        message.delete();
        const inaccessEmbed = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription('❌ You are not a staff member authorized to use this command.')
        message.author.send({ embeds: [inaccessEmbed] }).catch(e => {})
    }
}

module.exports.command = {
    name: "jail",
    aliases: ["excommunicate", "arrest"]
}