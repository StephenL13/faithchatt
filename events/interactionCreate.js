const client = require('../index.js').client;

/**
 * @param {Interaction} interaction
 */
client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {
    if (interaction.customId === 'verify') {
      //Prerequisite member role ID variable
      const verifiedRole = "839720518213959701"

      //The actual function
      if (!interaction.member.roles.cache.some(role => role.name === "Member")) {
        await interaction.member.roles.add(verifiedRole)
        await interaction.reply({ content: "You are now verified!", ephemeral: true })
      } else {
        await interaction.reply({ content: "Sorry, but you already have the member role!", ephemeral: true })
      }
    }
  }
})