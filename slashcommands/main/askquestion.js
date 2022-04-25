const { TextInputComponent, Modal, showModal } = require('discord-modals')

module.export.run = async(client, interaction) => {
    let textInput = new TextInputComponent()
    .setCustomId('textinput')
    .setLabel('You may submit your questions here.')
    .setStyle('LONG')
    .setMinLength(5)
    .setMaxLength(1500)
    .setPlaceholder('Text field')
    .setRequired(true)

    const questionModal = new Modal()
    .setCustomId('question-modal')
    .setTitle('#askquestion | FaithChatt')
    .addComponents(textInput)

    await showModal(questionModal, {
        client: client,
        interaction: interaction
    })
}

module.exports.command = {
    name: "askquestion"
}