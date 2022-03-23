const client = require('../index.js').client
const { MessageEmbed } = require('discord.js')
const faithchatt = require('../variablehandler.js')
const schema = require('../model/ticket.js')

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

            let data = await schema.findOne({ userId: interaction.user.id });

            const ticketembed = new MessageEmbed()
                .setTitle('Verification Questions')
                .setDescription(`1. What made you come to the server?\n2. Where did you find the invite link?\n3. What is your age and gender?\n4. What is your story of coming to the faith?\n5. Have you been on FaithChatt Forum in the past?\n\n**NOTE:** We only allow incoming members of 13 years old and above, as prescribed by Discord's Terms of Service, for the safety of our brothers and sisters online.\n\nIf done, ping a staff member available. Rest assured, we will reach out to you as soon as possible since we're available 24/7.`)
                .setThumbnail('https://cdn.discordapp.com/attachments/855630577105502228/904092673353334884/FaithChatt_Halo.png')
                .setColor("#ffd100")
                .setFooter({ text: "© FaithChatt Forum" })
            let ticketname = interaction.user.tag

            if(!data) {
                data = await schema.create({ userId: interaction.user.id, userName: ticketname });
                let verifychannel = await interaction.guild.channels.create(ticketname, {
                    type: "GUILD_TEXT",
                    parent: faithchatt.parentId.verification,
                    topic: interaction.user.id,
                    permissionOverwrites: [
                        { id: interaction.user.id, allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"], deny: ["EMBED_LINKS", "ATTACH_FILES", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "SEND_MESSAGES_IN_THREADS"] },
                        { id: regular.id, deny: ["EMBED_LINKS", "ATTACH_FILES", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "SEND_MESSAGES_IN_THREADS"] },
                        { id: memberrole.id, deny: ["VIEW_CHANNEL"] },
                        { id: unverified.id, deny: ["VIEW_CHANNEL"] },
                        { id: moderatorrole.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"] },
                        { id: everyone.id, deny: ["VIEW_CHANNEL"] }
                    ]
                })
                verifychannel.send({ content: `${interaction.user}`, embeds: [ticketembed] }).catch(e=>{})
                return interaction.reply({ content: `Ticket created! Please check ${verifychannel}`, ephemeral: true }).catch(e=>{})
            } else {
                return interaction.reply({ content: "You have already created a ticket! If you have problems, immediately contact/DM the moderators.", ephemeral: true }).catch(e=>{})
            }
        }
    }
})