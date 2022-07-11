const { Modal, MessageActionRow, TextInputComponent } = require('discord.js')

module.exports.run = async(client, interaction) => {
    const modal = new Modal()
    .setCustomId('suggest-modal')
    .setTitle('Suggest anything here!')
    const component = new MessageActionRow().addComponents(
        new TextInputComponent()
        .setCustomId('suggestinput')
        .setLabel('Enter your queries here.')
        .setMinLength(5)
        .setMaxLength(1500)
        .setStyle('PARAGRAPH')
        .setRequired(true)
    )
    await modal.addComponents(component)
    await interaction.showModal(modal)
}
module.exports.command = {
    name: `suggest` 
}