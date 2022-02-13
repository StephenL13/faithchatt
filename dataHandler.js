async function createCmd(client, guildId) {
    const data = [
        {
            name: "ping",
            description: "Serves a bot ping"
        },
        {
            name: "help",
            description: "A list of all FaithChatt Bot commands"
        },
        {
            name: "askquestion",
            description: "Submit a question anything related to faith and more!",
            options: [
                {
                    name: "text",
                    description: "Place your question here.",
                    type: "STRING",
                    required: true
                }
            ]
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
                            name: "Verification Tickets",
                            value: "verification"
                        },
                        {
                            name: "Role Commands",
                            value: "rolecmds"
                        },
                        {
                            name: "Logging",
                            value: "logging"
                        },
                        {
                            name: "Announcement",
                            value: "announcement"
                        }, 
                        {
                            name: "Professors",
                            value: "professors"
                        }, 
                        {
                            name: "Application Forms",
                            value: "application"
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