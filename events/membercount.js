const client = require('../index.js').client

const faithchatt = client.guilds.cache.get('')
setInterval(() => {
    const humanMemberCount = faithchatt.members.cache.filter(member => !member.user.bot);
    const humanMemberChannel = faithchatt.channels.cache.get('940128360347074600')
    humanMemberChannel.setName(`👥 Members: ${humanMemberCount}`)

    const boosterCount = faithchatt.members.cache.filter(member => member.roles.cache.has('852783343376269323'));
    const boosterChannel = faithchatt.channels.cache.get('940128649292685382')
    boosterChannel.setName(`🎆 Boosters: ${boosterCount}`)

    const gsCount = faithchatt.members.cache.filter(member => member.roles.cache.has('844788509301669898'));
    const gsChannel = faithchatt.channels.cache.get('940128750723547157')
    gsChannel.setName(`😇 Good Samaritans: ${gsCount}`)

    console.log('Member count is updating... (30 mins. interval)')
}, 1000 * 60 * 30)