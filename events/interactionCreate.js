const client = require('../index.js').client
const { MessageEmbed } = require('discord.js')
const faithchatt = require('../variablehandler.js')
const ticketschema = require('../model/ticket.js')
const configschema = require('../model/botconfig.js')

client.on('interactionCreate', async interaction => {
    // SLASH COMMAND HANDLER
    if(interaction.isCommand()) {
        let slashCmds = client.slashCmds.get(interaction.commandName)
        if (slashCmds) slashCmds.run(client, interaction)
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
                    .setTitle('Welcome! Please answer the questions properly to gain server entry. A minimum of one sentence will do.')
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
                    if (!ticketdata.channelId) {
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
        }
    }
})