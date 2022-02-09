module.exports.run = async (client, message, args, prefix) => {
    if(message.member.permissions.has("MANAGE_ROLES")) {
        const moderatorrole = message.guild.roles.cache.get('871058889339207681')

        if (!moderatorrole)
        return message.delete().then(async () => {
            await message.author.send("You're not a staff member authorized to use this command.");
            }).catch((e) => {});
        if (message.channel.parent.id === "940053879264006165"){
            if(message.channel.id === "940054019425075250") return message.delete()
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