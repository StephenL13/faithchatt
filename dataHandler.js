const { SlashCommandBuilder } = require('@discordjs/')
async function createCmd(client, guildId) {
    const data = [
        // Ping command
        {
            name: "ping",
            description: "Pings a bot with miliseconds"
        }
    ]

    await client.guilds.cache.get(guildId)?.commands.set(data)
    //await client.application?.commands.set(data) 
}

module.exports = { createCmd }