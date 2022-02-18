const client = require(`../index.js`).client
const faithchatt = require('../variablehandler.js') // Lists all IDs of channels, categories, and roles

client.on('guildMemberRemove', async member => {
    let ticketclose = await member.guild.channels.cache.find(c => c.topic === `${member.id}`)
    if(ticketclose) {
        if(ticketclose.parentId === faithchatt.parentId.verification) {
            ticketclose.delete()
        }
    }
})