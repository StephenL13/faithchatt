module.exports.run = async (client, message, args, prefix) => {
    const msgcontent = "Here is our invite link if you want to want to share it with your friends, so they can join. God bless you!\nhttps://discord.gg/faithchatt"
    await message.react("✅")
    await message.author.send(msgcontent).catch(e => {
        message.channel.send("**❌ Notice: Your DMs are closed!**\n"+msgcontent)
        console.log(e)
    })
}

module.exports.command = {
    name: "invite",
    aliases: []
}