const client = require('../index.js').client
const { MessageEmbed, MessageActionRow, MessageButton, TextInputComponent, Modal } = require('discord.js')
const faithchatt = require('../variablehandler.js')
const ticketschema = require('../model/ticket.js')
const configschema = require('../model/botconfig.js')
const moment = require('moment')

client.on('interactionCreate', async interaction => {
    // SLASH COMMAND HANDLER
    if(interaction.isCommand()) {
        let slashCmds = client.slashCmds.get(interaction.commandName)
        if (slashCmds) slashCmds.run(client, interaction)
    }

    if(interaction.isModalSubmit()) {
        if(interaction.customId == "question-modal") {
            const textChannel = client.channels.cache.get(faithchatt.textId.askquestion)
            const textInput = await interaction.fields.getTextInputValue('textinput')
            let simpledate = await moment().format('M-D-YYYY')

            const button1 = new MessageButton()
                .setCustomId('askquestion-interaction')
                .setDisabled(false)
                .setLabel('Click here to ask a question!')
                .setEmoji('📖')
                .setStyle('PRIMARY')
            const button2 = new MessageButton()
                .setCustomId('askquestion-help')
                .setDisabled(false)
                .setLabel('How To Use')
                .setStyle('SECONDARY')
                .setEmoji('🆘')
            const row = new MessageActionRow()
                .addComponents(button1, button2)
            let output = await textChannel.send({ 
                embeds: [
                new MessageEmbed()
                .setColor('#ffd100')
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                .setTitle("A new question has been submitted!")
                .setDescription(textInput)
                .setFooter({ text: `User ID: ${interaction.user.id} | © FaithChatt Forum`}),
                ]
            })
            let msgFetch = await textChannel.messages.fetch(output.id)
            let newThread = await msgFetch.startThread({
                name: `${interaction.user.username} | ${simpledate}`,
                autoArchiveDuration: 1440,
                rateLimitPerUser: 5
            })
            newThread.send({ content: `Feel free to ping the \`@Professors\`, \`@Facilitators\`, or any fellow member who is free and capable to answer your concerns with Scriptural backing. God bless you.` + `\n\n${interaction.user}` })

            await interaction.deferUpdate().catch(err => {})
            await interaction.message.delete();
            await textChannel.send({
                embeds: [
                    new MessageEmbed()
                    .setDescription('Please post any questions you have about faith, life, or whatever here. The \`@Professors\` and \`@Facilitators\` also assure to keep on stand-by addressing theological concerns and anything related to Christian life.')
                    .setColor('#ffd100')
                ],
                components: [row]
            })
        }
    }

    // THE SYSTEM
    if(interaction.isButton){
        if(interaction.customId == "verifyStart"){
            const moderatorrole = interaction.guild.roles.cache.get(faithchatt.rolesId.staff)
            const unverified = interaction.guild.roles.cache.get(faithchatt.rolesId.unverified)
            const regular = interaction.guild.roles.cache.get(faithchatt.rolesId.regular)
            const memberrole = interaction.guild.roles.cache.get(faithchatt.rolesId.member)
            const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")

            let ticketdata = await ticketschema.findOne({ userId: interaction.user.id });
            let configdata = await configschema.findOne({ guildId: interaction.guild.id });
            if(!configdata) configdata = await configschema.create({ guildId: interaction.guild.id });
            if(configdata.verifyLock === true) { 
                return interaction.reply({ 
                embeds: [
                    new MessageEmbed()
                    .setTitle("Verification is currently locked.")
                    .setDescription("Due to the incoming members involving a raid or any unknown circumstance, the verification channel is locked until further notice. Please contact a staff member for questions and details.")
                    .setFooter({ text: "© FaithChatt Forum" })
                    .setColor("#ff0000")
                ],
                ephemeral: true 
            })} else if (configdata.verifyLock === false) {
                const ticketembed = new MessageEmbed()
                    .setTitle('Welcome! Please answer the questions properly to gain server entry.  A minimum of one sentence will do. One-worders for each question will not be accepted.')
                    .setDescription(`1. What made you come to the server?\n2. Where did you find the invite link?\n3. What is your age and gender?\n4. What is your story of coming to the faith?\n5. Have you been on FaithChatt Forum in the past?\n6. If done, ping a staff member. We will reach out to you as soon as possible.\n\n**NOTE:** We only allow incoming members of 13 years old and above, as prescribed by Discord's Terms of Service, for the safety of our brothers and sisters online.`)
                    .setThumbnail('https://i.imgur.com/xO46ifo.png')
                    .setColor("#ffd100")
                    .setFooter({ text: "© FaithChatt Forum" })
                let ticketname = interaction.user.tag;

                if(!ticketdata) {
                    let verifychannel = await interaction.guild.channels.create(ticketname, {
                        type: "GUILD_TEXT",
                        parent: faithchatt.parentId.verification,
                        topic: interaction.user.id,
                        permissionOverwrites: [
                            { id: interaction.user.id, allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"], deny: ["MANAGE_CHANNELS", "EMBED_LINKS", "ATTACH_FILES", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "CREATE_INSTANT_INVITE", "SEND_MESSAGES_IN_THREADS", "MANAGE_THREADS", "MANAGE_MESSAGES", "USE_EXTERNAL_EMOJIS", "USE_EXTERNAL_STICKERS", "USE_APPLICATION_COMMANDS", "MANAGE_WEBHOOKS", "MANAGE_ROLES", "SEND_TTS_MESSAGES"] },
                            { id: regular.id, deny: ["EMBED_LINKS", "ATTACH_FILES"] },
                            { id: memberrole.id, deny: ["VIEW_CHANNEL"] },
                            { id: unverified.id, deny: ["VIEW_CHANNEL"] },
                            { id: moderatorrole.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"] },
                            { id: everyone.id, deny: ["VIEW_CHANNEL"] }
                        ]
                    })
                    ticketdata = await ticketschema.create({ 
                        userId: interaction.user.id, 
                        userName: ticketname,
                        channelId: verifychannel.id
                    });
                    verifychannel.send({ content: `${interaction.user}`, embeds: [ticketembed] }).catch(e=>{})
                    return interaction.reply({ content: `Ticket created! Please check ${verifychannel}`, ephemeral: true }).catch(e=>{})
                } else {
                    if (!interaction.guild.channels.cache.has(ticketdata.channelId)) {
                        let verifychannel = await interaction.guild.channels.create(ticketname, {
                            type: "GUILD_TEXT",
                            parent: faithchatt.parentId.verification,
                            topic: interaction.user.id,
                            permissionOverwrites: [
                                { id: interaction.user.id, allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"], deny: ["MANAGE_CHANNELS", "EMBED_LINKS", "ATTACH_FILES", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "CREATE_INSTANT_INVITE", "SEND_MESSAGES_IN_THREADS", "MANAGE_THREADS", "MANAGE_MESSAGES", "USE_EXTERNAL_EMOJIS", "USE_EXTERNAL_STICKERS", "USE_APPLICATION_COMMANDS", "MANAGE_WEBHOOKS", "MANAGE_ROLES", "SEND_TTS_MESSAGES"] },
                                { id: regular.id, deny: ["EMBED_LINKS", "ATTACH_FILES"] },
                                { id: memberrole.id, deny: ["VIEW_CHANNEL"] },
                                { id: unverified.id, deny: ["VIEW_CHANNEL"] },
                                { id: moderatorrole.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"] },
                                { id: everyone.id, deny: ["VIEW_CHANNEL"] }
                            ]
                        })
                        ticketdata.channelId = verifychannel.id;
                        await ticketdata.save();
                        await verifychannel.send({ content: `${interaction.user}`, embeds: [ticketembed] }).catch(e=>{})
                        return interaction.reply({ content: `Ticket created! Please check ${verifychannel}`, ephemeral: true }).catch(e=>{})
                    }
                    return interaction.reply({ content: "You have already created a ticket! If you have problems, immediately contact/DM the moderators.", ephemeral: true }).catch(e=>{})
                }
            } else return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle("An error has occured.")
                    .setDescription("Please contact a staff member for further assistance.")
                    .setFooter({ text: "© FaithChatt Forum" })
                ],
                ephemeral: true
            })
        } else if (interaction.customId == 'askquestion-interaction') {
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
        } else if (interaction.customId == "askquestion-help") {
            await interaction.reply({
                content: `https://cdn.discordapp.com/attachments/839719700140261388/981851220304089178/FaithChatt_new_feature_1.mp4`,
                ephemeral: true
            })
        }
    }
})