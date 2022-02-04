module.exports.run = async(client, message, args, prefix) => {
    if(message.author.id == "136292974379270144") {
        client.emit('guildMemberAdd', message.member)
    } else return message.delete()
}

module.exports.command = {
    name: "joinemit",
    aliases: []
}