const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, message, args, prefix) => {
    const moderatorrole = message.member.roles.cache.get('871058889339207681')
    const memberrole = message.member.roles.cache.get('839720518213959701')
    const unverified = message.member.roles.cache.get('940052640472109117')
    const pending = message.member.roles.cache.get('940281435644911656')
    const targetmember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if(moderatorrole) {
        if(message.channel.parent.id === '940053879264006165') {
            if(!args[0]) return message.channel.send('Correct command usage:\n\`!verify <@user/userid>\`').catch(e => {})
            try {
                if (!targetmember) {
                    return message.channel.send('**Please mention a user.**\n\nCorrect command usage:\n\`!verify <@user/userid>\`').catch(e => {})
                } else {
                    if(!targetmember.roles.cache.has('839720518213959701')) {
                        const embed = new MessageEmbed()
                            .setTitle("Congratulations! You have been verified.")
                            .setDescription("To get your roles, please visit the <#922188972854231160> channel.")
                            .setThumbnail("https://cdn.discordapp.com/attachments/855630577105502228/904092673353334884/FaithChatt_Halo.png")
                            .setColor("#ffd100")
                            .setFooter({ text:"© FaithChatt Forum" });
                        await message.react('✅')
                        await targetmember.roles.add(memberrole).then(() => {
                            targetmember.roles.remove(unverified).catch(e => {})
                            targetmember.roles.remove(pending).catch(e => {})
                        }).catch(e => {})
                        await targetmember.send({ embeds: [embed] }).catch(e => console.log(`⚠ I'm confirming ${targetmember}'s verification, but his/her DMs are closed!`))
                        await message.reply({ content: `${targetmember} is now verified!\n**The channel will be closed in five seconds.**` })
                            .then(() => {
                                setTimeout(() => {
                                    message.channel.delete()
                                }, 5000)
                            })
                            .catch(e => {}) 
                    } else {
                        await message.react('❌')
                        await message.reply('⚠ Member has been already verified!').then(msg => {setTimeout(() => msg.delete(), 5000)})
                    }
                }
            } catch (e) {
                await message.channel.send('There was an error executing this command!')
                await console.log(e)
            }
        } else {
            await message.delete();
            await message.author.send('The verify command should work ONLY on verification tickets opened by a user.').catch(e => {})
        }
    } else {
        await message.delete();
        const inaccessEmbed = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription('❌ You are not a staff member authorized to use this command.')
        await message.author.send({ embeds: [inaccessEmbed] }).catch(e => {})
    }
}

module.exports.command = {
    name: "verify",
    aliases:[]
}