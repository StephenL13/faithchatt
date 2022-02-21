const { MessageEmbed } = require('discord.js')
const faithchatt = require('../../variablehandler.js')

module.exports.run = async(client, message, args, prefix) => {
    await message.channel.send({ embeds: [
        new MessageEmbed()
        .setTitle('🚨')
    ] })
}

module.exports.command = {
    name: "logemit",
    aliases: []
}