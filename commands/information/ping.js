module.exports.run = async (client, message, args, prefix) => {
  message.channel.send(`Hi, ${message.author}! You have ${client.ws.ping} ms.`)
}

module.exports.command = {
  name: "ping",
  aliases: []
}