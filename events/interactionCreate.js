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
      if (!interaction.member.roles.cache.has(verifiedRole)) {
        await interaction.member.roles.add(verifiedRole)
        await interaction.reply({ content: "You are now verified!", ephemeral: true })
      } else {
        await interaction.reply({ content: "Sorry, but you already have the member role!", ephemeral: true })
      }
    } else if(interaction.customId === "cstatement") {
      const goodsamaritan = "844788509301669898"
      if(!interaction.member.roles.cache.has(goodsamaritan)) {
        await interaction.member.roles.add(goodsamaritan)
        await interaction.reply({ content: "You have now confirmed to the agreement! Please visit <#839896314963296277> to continue on the server access if you haven't.", ephemeral: true })
      } else {
        await interaction.reply({ content: "You have already confirmed to the agreement.", ephemeral: true })
      }
    }
  }
})