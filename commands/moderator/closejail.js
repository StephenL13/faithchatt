module.exports.run = async (client, message, args, prefix) => {
    if(message.member.permissions.has("MANAGE_ROLES")) {
        const moderatorrole = message.guild.roles.cache.get('871058889339207681')

        if (!moderatorrole)
        return message.delete().then(async () => {
            await message.author.send("You're not a staff member authorized to use this command.");
            }).catch((e) => {});
        if (message.channel.parent.id === "934728381294063616"){
            if(message.channel.id === "934731088570494976") return message.delete()
            await message.react('✅')
            await message.channel.send("**The channel will be closed in five seconds.**")
            setTimeout(() => {
                message.channel.delete()
            }, 5000)
        } else return console.log(`${message.author.tag} executed in a non-jail ticket.`)
    } else {
        message.delete();
        message.author.send('You are not a staff member authorized to use this command.').catch(e=>{})
    }
}

module.exports.command = {
    name: "closejail",
    aliases:[]
}