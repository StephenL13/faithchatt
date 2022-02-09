module.exports.run = async (client, message, args, prefix) => {
    if(message.member.permissions.has("MANAGE_ROLES")) {
        let targetmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const mutedrole = message.guild.roles.cache.get('859912959660785667')
        const moderatorrole = message.guild.roles.cache.get('871058889339207681')

        if (!moderatorrole)
        return message.delete().then(async () => {
            await message.author.send("You're not a staff member authorized to use this command.");
            }).catch((e) => {});
            if(!targetmember) return message.channel.send("Command usage:\n`!unjail <@user/uid>`");
        if (message.channel.parent.id === "934728381294063616"){
            if(message.channel.id === "934731088570494976") return message.delete()
            await message.react('✅')
            await message.channel.send("**Member unjailed! The channel will be closed in five seconds.**")
            setTimeout(() => {
                targetmember.roles.remove(mutedrole);
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
    name: "unjail",
    aliases:[]
}