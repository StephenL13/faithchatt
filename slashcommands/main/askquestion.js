const { TextInputComponent, Modal, showModal } = require('discord-modals')

module.export.run = async(client, interaction) => {
    let textInput = new TextInputComponent()
    .setCustomId('textinput')
    .setLabel('Anything related to Christianity goes here.')
    .setStyle('LONG')
    .setMinLength(5)
    .setMaxLength(100)
    .setPlaceholder('Text field')
    .setRequired(true)

    const questionModal = new Modal()
    .setCustomId('question-modal')
    .setTitle('Please answer the questions.')
    .addComponents(textInput)

    await showModal(questionModal, {
        client: client,
        interaction: interaction
    })
}

module.exports.command = {
    name: "askquestion"
}