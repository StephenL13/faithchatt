const moment = require('moment')
module.exports.run = async(client, message, args, prefix) => {
    if(message.author.id == "136292974379270144") {
        let simpledate = await moment().format('l')
        await message.channel.send(`Today is ${simpledate}`)
    } else return message.delete()
}

module.exports.command = {
    name: "momentemit",
    aliases: []
}