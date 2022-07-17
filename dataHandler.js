async function createCmd(client, guildId) {
    const data = [
        {
            name: "ping",
            description: "Serves a bot ping"
        },
        {
            name: "membercount",
            description: "Displays a count for human members"
        },
        {
            name: "help",
            description: "A list of all FaithChatt Bot commands"
        },
        {
            name: "topic",
            description: "Start a new topic that prescribes the Christian faith."
        },
        {
            name: "suggest",
            description: "Creates a new server suggestion"
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
    ]

    await client.guilds.cache.get(guildId)?.commands.set(data)
    //await client.application?.commands.set(data) 
}

module.exports = { createCmd }