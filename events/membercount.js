const client = require('../index.js').client

// GUILD ID
const faithchatt = client.guilds.cache.get('839708279973478430')

// HUMAN MEMBERS
const humanMemberCount = faithchatt.members.cache.filter(member => !member.user.bot).size;
const onlineCount = faithchatt.members.cache.filter(member => !member.user.bot && member.presence?.status === "online").size;
const humanMemberChannel = faithchatt.channels.cache.get('940128360347074600')

// SERVER BOOSTERS
const boosterCount = faithchatt.members.cache.filter(member => member.roles.cache.has('852783343376269323')).size;
const boosterChannel = faithchatt.channels.cache.get('940128649292685382')

// GOOD SAMARITANS
const gsCount = faithchatt.members.cache.filter(member => member.roles.cache.has('844788509301669898')).size;
const gsChannel = faithchatt.channels.cache.get('940128750723547157')

async function initCount() {
    humanMemberChannel.setName(`👥: ${humanMemberCount} | 🟢: ${onlineCount}`)
    boosterChannel.setName(`💜 Boosters: ${boosterCount}`)
    gsChannel.setName(`😇 Samaritans: ${gsCount}`)
    console.log('Member count initialized.')
}

client.on('ready', () => {
    initCount()
    setTimeout(() => initCount(), 1000 * 60 * 15)
})
client.on('guildMemberAdd', () => initCount())
client.on('guildMemberRemove', () => initCount())