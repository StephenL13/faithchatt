const client = require(`../index.js`).client
const faithchatt = require('../variablehandler.js') // Lists all IDs of channels, categories, and roles
const { MessageEmbed } = require('discord.js')

client.on('guildMemberRemove', async member => {
    let memChannel = await member.guild.channels.cache.find(c => c.topic === `${member.id}`)
    if(memChannel) {
        if(memChannel.parentId === faithchatt.parentId.verification) {
            const messages = await memChannel.messages.fetch()
            const arrayMessages = await messages.filter(msg => !msg.length).reverse()
            const text = await arrayMessages.map(m=>`${m.author.tag}: ${m.content}`).join("\n")
            const logChannel = await client.channels.cache.get(faithchatt.textId.verifylog)
            await logChannel.send({ 
                content: `\`\`\`\n${text}\`\`\``,
                embeds: [
                    new MessageEmbed()
                    .setColor('#FF0000')
                    .setDescription(`Ticket closed for member who left.`)
                ]
            })
            memChannel.send({ content: "**Member has left the server. Channel closes in five seconds.**" })
            setTimeout(() => {
                memChannel.delete()
            }, 5000)
        } else if(memChannel.parentId === faithchatt.parentId.jail) {
            if(member.roles.cache.has(faithchatt.rolesId.muted)) {
                memChannel.send({ content: `**A jailed member left. Staff has now the floor to implement for a decision.**\n\n\`${member.user.tag}\` - \`${member.user.id}\``}).catch(e => console.log(e))
            }
        }
    }
})