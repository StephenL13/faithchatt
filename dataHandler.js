async function createCmd(client, guildId) {
    const data = [
        // Ping command
        {
            name: "ping",
            description: "Pings a bot with miliseconds"
        },

        {
            name: "modhelp",
            description: "Staff member commands",
            options: [{
                name: "category",
                type: "STRING",
                description: "Select which category would you like to see.",
                required: true,
                choices: [
                    {
                        name: "Basic Moderation",
                        value: "moderation"
                    },
                    {
                        name: "Role Commands",
                        value: "rolecmd"
                    }
                ]
            }]
        }
    ]

    await client.guilds.cache.get(guildId)?.commands.set(data)
    //await client.application?.commands.set(data) 
}

module.exports = { createCmd }