const { TextInputComponent, Modal, MessageActionRow } = require('discord.js')

module.exports.run = async(client, interaction) => {
    const modal = new Modal()
        .setCustomId('question-modal')
        .setTitle('Submit for #🤓│any-questions')
    const component = new MessageActionRow().addComponents(
        new TextInputComponent()
        .setCustomId('textinput')
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
    name: "askquestion"
}