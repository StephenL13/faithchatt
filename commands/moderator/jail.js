const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message, args, prefix) => {
    if(message.member.permissions.has("MANAGE_ROLES")) {
        let targetmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ")
        const memberrole = message.guild.roles.cache.get('839720518213959701')
        const mutedrole = message.guild.roles.cache.get('859912959660785667')
        const moderatorrole = message.guild.roles.cache.get('871058889339207681')
        const everyone = message.guild.roles.cache.find(r => r.name === "@everyone")

        if(!moderatorrole) return message.delete().then(async() => {await message.author.send("You're not a staff member authorized to use this command.")}).catch(e => {})
        if(!targetmember) return message.channel.send("Command usage:\n`!jail <@user/uid> <reason>`")
        if(targetmember.roles.cache.has(mutedrole)) return message.reply("The member has been already jailed!")
        if(!reason) return message.channel.send("Please supply a reason of the suspect.\n`!jail <@user/uid> <reason>`")
        targetmember.roles.add(mutedrole)
        let ticketname = targetmember.user.tag
        let jailchannel = await message.guild.channels.create("jail-"+ticketname, {
            type: "GUILD_TEXT",
            parent: "934728381294063616",
            topic: "Jail ticket for "+ticketname
        })
        await jailchannel.permissionOverwrites.set([
            { id: targetmember.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"] },
            { id: memberrole.id, deny: ["VIEW_CHANNEL"] },
            { id: moderatorrole.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"] },
            { id: everyone.id, deny: ["VIEW_CHANNEL"] }
        ])
        console.log(`🚨 Member has been jailed:\nMember: ${targetmember.user.tag}\nReason: ${reason}`)
        const channelembed = new MessageEmbed()
            .setTitle("You have been jailed!")
            .setDescription(`👤 **Suspect:** \`${targetmember.user.tag}\`\n🔒 **Reason:** \`${reason}\`\n\nYou have been restricted access to all channels as of the moment. Please consider talking to our mods if you're deemed to be acting detrimently in the server. Leaving and rejoining the server to bypass the mute will result into a permanent sanction.`)
            .setFooter({ text: targetmember.user.id })
            .setColor('#ff0000')
        jailchannel.send({ content: `${targetmember}`, embeds: [channelembed] })
    } else {
        message.delete();
        message.author.send('You are not a staff member authorized to use this command.')
    }
}

module.exports.command = {
    name: "jail",
    aliases:[]
}