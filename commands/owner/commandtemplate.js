module.exports.run = async (client, message, args, prefix) => {
  await message.channel.send("This is a test command.")
  console.log(`${message.author} has executed the command.`)
}

module.exports.command = {
  name: "eval",
  aliases: []
}