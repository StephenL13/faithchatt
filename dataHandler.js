async function createCmd(client, guildId) {
    const data = [
        // Ping command
        {
            name: "ping",
            description: "Pings a bot with miliseconds"
        },

        {
            name: "pray",
            description: "Send an anonymous prayer request!",
            options: [{
                name: "petition",
                type: "STRING",
                required: true
            }]
        }
    ]

    await client.guilds.cache.get(guildId)?.commands.set(data)
    //await client.application?.commands.set(data) 
}

module.exports = { createCmd }