const client = require(`../index.js`).client
const faithchatt = require('../variablehandler.js') // Lists all IDs of channels, categories, and roles

client.on('guildMemberRemove', async member => {
    let autoclose = await member.guild.channels.cache.find(c => c.topic === `${member.id}`)
    if(autoclose) {
        if(autoclose.parentId === faithchatt.parentId.verification) {
            autoclose.delete()
        } else if(autoclose.parentId === faithchatt.parentId.jail) {
            if(member.roles.cache.has(faithchatt.rolesId.muted)) {
                autoclose.send({ content: "**Member has left the jail. Staff decision will be implemented.**"})
            }
        }
    }
})