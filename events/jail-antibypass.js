const client = require('../index.js').client
const schema = require('../model/jailsystem.js')
const faithchatt = require('../variablehandler.js');

// IF JAILED MEMBER LEAVES THE SERVER
client.on('guildMemberRemove', async member => {
    let memberId = await member.guild.channels.cache.find(c => c.topic === `${member.id}`)
    if(memberId) {
        if(memberId.parentId === faithchatt.parentId.jail) {
            let data = await schema1.findOne({ guildId: member.guild.id });
            if(!data) return;
        }
    }
})