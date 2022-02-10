const { SlashCommandBuilder } = require('@discordjs/builders')
async function createCmd(client, guildId) {
    const data = [
        {
            name: "ping",
            description: "Serves a bot ping"
        },
        {
            name: "pray",
            description: "Sends an anonymous prayer",
            options: {
                name: "text",
                description: "Pleace your petition here.",
                type: "STRING"
            }
        }
    ]

    await client.guilds.cache.get(guildId)?.commands.set(data)
    //await client.application?.commands.set(data) 
}

module.exports = { createCmd }