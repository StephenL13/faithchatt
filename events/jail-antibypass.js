const client = require('../index.js').client
const schema = require('../model/jailsystem.js')

// IF JAILED MEMBER LEAVES THE SERVER
client.on('guildMemberRemove', () => {
    // the code goes here
})

// IF JAILED MEMBER REJOINS THE SERVER
client.on('guildMemberAdd', () => {
    // the code goes here
})

// IF JAILED MEMBER GETS BANNED
client.on('guildMemberBan', () => {
    // the code goes here
})