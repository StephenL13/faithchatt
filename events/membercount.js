const client = require('../index.js').client

client.on('ready', () => {
    const faithchatt = client.guilds.cache.get('839708279973478430')
    
    const humanMemberCount = faithchatt.members.cache.filter(member => !member.user.bot).size;
    const humanMemberChannel = faithchatt.channels.cache.get('940128360347074600')

    const onlineCount = faithchatt.members.cache.filter(member => !member.user.bot && member.presence?.status === "online").size;
    const onlineChannel = faithchatt.channels.cache.get('940139289013018675')

    const boosterCount = faithchatt.members.cache.filter(member => member.roles.cache.has('852783343376269323')).size;
    const boosterChannel = faithchatt.channels.cache.get('940128649292685382')

    const gsCount = faithchatt.members.cache.filter(member => member.roles.cache.has('844788509301669898')).size;
    const gsChannel = faithchatt.channels.cache.get('940128750723547157')

    //INITIALIZE MEMBER COUNT
    humanMemberChannel.setName(`Members: ${humanMemberCount}`)
    onlineChannel.setName(`Online: ${onlineCount}`)
    boosterChannel.setName(`Boosters: ${boosterCount}`)
    gsChannel.setName(`Good Samaritans: ${gsCount}`)
    console.log('Member count initialized.')

    //LOOP PING FOR MEMBER COUNT
    setInterval(() => {
        humanMemberChannel.setName(`Members: ${humanMemberCount}`)
        onlineChannel.setName(`Online: ${onlineCount}`)
        boosterChannel.setName(`Boosters: ${boosterCount}`)
        gsChannel.setName(`Good Samaritans: ${gsCount}`)

        console.log('Member count is updating... (30 mins. interval)')
    }, 1000 * 60 * 30)
})