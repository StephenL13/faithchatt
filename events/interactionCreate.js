const client = require('../index.js').client
const { MessageEmbed } = require('discord.js')

client.on('interactionCreate', async interaction => {
    // SLASH COMMAND HANDLER
    if(interaction.isCommand()) {
        let slashCmds = client.slashCmds.get(interaction.commandName)
        if (slashCmds) slashCmds.run(client, interaction)
    }

    // THE SYSTEM
    if(interaction.isButton){
        if(interaction.customId == "verifyticket"){
            const moderatorrole = interaction.member.roles.cache.get('871058889339207681')
            const unverified = interaction.member.roles.cache.get('940052640472109117')
            const pending = interaction.member.roles.cache.get('940281435644911656')
            const memberrole = interaction.member.roles.cache.get('839720518213959701')
            const everyone = interaction.member.roles.cache.find(r => r.name === "@everyone")

            const ticketembed = new MessageEmbed()
                .setTitle('Verification Questions')
                .setDescription(`1. What made you come to the server?\n2. Where did you find the invite link?\n3. What is your age and gender?\n4. What is your story of coming to the faith?\n5. Ping an active staff member once you're done.`)
                .setThumbnail('https://cdn.discordapp.com/attachments/855630577105502228/904092673353334884/FaithChatt_Halo.png')
                .setColor("#ffd100")
                .setFooter({ text: "© FaithChatt Forum" })
            let ticketname = interaction.user.tag

            if(interaction.member.roles.cache.has('940281435644911656')) {
                return interaction.reply({ content: "You have already created a ticket! If you have problems, immediately contact/DM the moderators.", ephemeral: true }).catch(e=>{})
            } else {
                await interaction.member.roles.add(pending).catch(e => {})
                let verifychannel = await interaction.guild.channels.create(ticketname, {
                    type: "GUILD_TEXT",
                    parent: "940053879264006165",
                    topic: interaction.user.id
                })
                await verifychannel.permissionOverwrites.set([
                    { id: interaction.user.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES"], deny: ["EMBED_LINKS", "ATTACH_FILES"] },
                    { id: memberrole.id, deny: ["VIEW_CHANNEL"] },
                    { id: pending.id, deny: ["VIEW_CHANNEL"] },
                    { id: unverified.id, deny: ["VIEW_CHANNEL"] },
                    { id: moderatorrole.id, allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"] },
                    { id: everyone.id, deny: ["VIEW_CHANNEL"] }
                ])
                verifychannel.send({ content: `${interaction.user}`, embeds: [ticketembed] }).catch(e=>{})
                return interaction.reply({ content: `Ticket created! Please check ${verifychannel}`, ephemeral: true }).catch(e=>{})
            }
        }
    }
})