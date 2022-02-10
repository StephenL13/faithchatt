async function createCmd(client, guildId) {
    const data = [
        {
            name: "ping",
            description: "Serves a bot ping"
        },
        {
            name: "pray",
            description: "Sends a prayer request.",
            options: [
                {
                    name: "text",
                    description: "Place your petition here.",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "ping",
                    description: "Ping the prayer warriors?",
                    type: "BOOLEAN",
                    required: true
                }
            ]
        },
        {
            name: "modhelp",
            description: "Serves a bot ping",
            options: [
                {
                    name: "category",
                    description: "Select the help category here.",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "Basic Moderation",
                            value: "moderation"
                        }, 
                        {
                            name: "Role Commands",
                            value: "rolecmds"
                        }
                    ]
                }
            ]
        },
    ]

    await client.guilds.cache.get(guildId)?.commands.set(data)
    //await client.application?.commands.set(data) 
}

module.exports = { createCmd }