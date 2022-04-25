const client = require(`../index.js`).client;
const { MessageEmbed } = require('discord.js');
const { textId } = require('../variablehandler.js')
const moment = require('moment')

client.on('modalSubmit', async (modal) => { 
    if(modal.customId === "question-modal"){
        const textChannel = client.channels.cache.get(textId.askquestion)
        const textInput = modal.getTextInputValue('textinput')
        let simpledate = await moment().format('M-D-YYYY')

        await modal.deferReply({ ephemeral: true })
        modal.followUp({ embeds: [
            new MessageEmbed()
            .setColor('#ffd100')
            .setTitle('Your question has been sent!')
            .setDescription('*NOTE: Should there be any submissions that is against the rules, it will be removed immediately.*')
        ] }).catch(e=>console.log(e))
        let output = await textChannel.send({ content: `${modal.user}`, embeds: [
            new MessageEmbed()
            .setColor('#ffd100')
            .setAuthor({ name: modal.user.tag, iconURL: modal.user.displayAvatarURL() })
            .setTitle("A new question has been submitted!")
            .setDescription(textInput)
            .setFooter({ text: "© FaithChatt Forum" })
        ]})
        let msgFetch = await textChannel.messages.fetch(output.id)
        let newThread = await msgFetch.startThread({
            name: `${modal.user.username} | ${simpledate}`,
            autoArchiveDuration: 1440,
            rateLimitPerUser: 5
        })
        newThread.send({ content: `Feel free to ping the \`@Professors\`, \`@Facilitators\`, or any fellow member who is free and capable to answer your concerns with Scriptural backing. God bless you.` })
    }
});