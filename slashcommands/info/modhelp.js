const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, interaction) => {
    const moderatorRoleId = "871058889339207681"
    const choiceCategory = interaction.options.getString("category")
    
    if(!interaction.member.roles.cache.has(moderatorRoleId)) {
        await interaction.reply({ embeds: [
            new MessageEmbed()
            .setDescription('❌ You are not a staff member authorized to use this command.')
            .setColor('#FF0000')
        ], ephemeral: true}).catch(e=>console.log(e))
    } else {
        switch (choiceCategory) {
            case "moderation": {
                await interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setTitle("Basic Moderation Commands")
                    .setDescription(`\`?warn [member] [reason] - warn\`\n\`?kick [member] [reason]\` - kick\n\`?ban [member] [reason]\` - ban\n\`?purge [count]\` - max. 1000 messages\n\`?purge [count] [user]\`\n\`!jail <@user/uid> <reason>\` - jail\n\`!unjail <@user/uid>\` - Unjail the repenting user\n\`!closejail\` - Only applicable for those who left the server\n\`!lock\` | \`!unlock\` - Changes the state of the channel for lockdown (except the Bible Study channel)\n\n\`?avatar [@user/userid]\` - User's avatar\n\`?poll [message] "[choice1]" "[choice2]"\` - Create a poll (10 max. choices)\n\`?poll show [message ID/link]\` - Results of a poll`)
                    .setImage('https://i.imgur.com/IDkJbsi.png')
                    .setColor("#ffd100")
                    .setFooter({ text: "© FaithChatt Forum" })
                ], ephemeral: true })
            } break;
            case "verification": {
                await interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setTitle("Verification")
                    .setDescription("\`!verify <@user/userid>\`\n\`!closeverify\`")
                    .setImage('https://i.imgur.com/mqf4MsX.png')
                    .setColor("#ffd100")
                    .setFooter({ text: "© FaithChatt Forum" })
                ], ephemeral: true })
            } break;
            case "rolecmds": {
                await interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setTitle("Role Commands")
                    .setDescription("\`?role [userid] [roleid]\`\n\`?role removeall [user]\`")
                    .setColor("#ffd100")
                    .setFooter({ text: "© FaithChatt Forum" })
                ], ephemeral: true })
            } break;
            case "logging": {
                await interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setTitle("Logging")
                    .setDescription("\`?modlogs <user-id> or <ping>\`\n\`?notes <user-id>\` - View notes\n\`?note <user-id>\` - Add note(s)\n\`?delnote <user-id> <note-id>\` - Deletes a note\n\`?editnote <user-id> <note-id> [New Message]\` - Edits a note")
                    .setColor("#ffd100")
                    .setFooter({ text: "© FaithChatt Forum" })
                ], ephemeral: true })
            } break;
            case "announcement": {
                await interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setTitle("Announcements")
                    .setDescription("\`?announce [channel] [message]\`\n\`?announce everyone [channel] [message]\`\n\`?announce here [channel] [message]\`\n\`?announce role [role] [channel] [message]\`")
                    .setColor("#ffd100")
                    .setFooter({ text: "© FaithChatt Forum" })
                ], ephemeral: true })
            } break;
            case "professors": {
                await interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setTitle("Professor/Facilitator Commands")
                    .setDescription("**BIBLE STUDY TEXT CHANNEL**\n\`!bslock\` - Locks the Bible Study text channel\n\`!bsunlock\` - Unlocks the Bible Study text channel\n\n**CRAIG RECORDING TOOL**\n\`<@272937604339466240> join or record\` - Starts audio recording\n\`<@272937604339466240> leave or stop\` - Stops audio recording")
                    .setColor("#ffd100")
                    .setFooter({ text: "© FaithChatt Forum" })
                ], ephemeral: true })
            } break;
            case "application": {
                await interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setTitle("Application Forms")
                    .setDescription("\`!adminform\` \`!moderatorform\`\n\`!teacherform\` \`!partnerform\`")
                    .setColor("#ffd100")
                    .setFooter({ text: "© FaithChatt Forum" })
                ], ephemeral: true })
            } break;
        }
    }
}

module.exports.command = {
    name: "modhelp"
}