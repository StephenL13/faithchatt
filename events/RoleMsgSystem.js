const client = require('../index.js').client
const { MessageEmbed } = require('discord.js');
const faithchatt = require('../variablehandler.js')

client.on('guildMemberAdd', async member => {
  const welcomeEmbed = new MessageEmbed()
    .setTitle("Welcome to FaithChatt Forum!")
    .setDescription(`Thank you for joining us here on Discord. We are here to provide Bible studies to the entire world, fellowship with friends, Christian discipleship, and to share the gospel daily. Thanks for helping us proclaim the love of Jesus Christ virtually. Don't forget to read the <#${faithchatt.textId.rules}>, then head over to <#${faithchatt.textId.verify}>. Also, don't forget to check out our <#${faithchatt.textId.confidentiality}>`)
    .setImage('https://media1.giphy.com/media/z1kL3TjrK278E6EhZF/giphy.gif?cid=790b7611e06601e976e82fa774ae08ceab4bd86a1f6672ea&rid=giphy.gif&ct=g')
    .setColor("#ffd100")
    .setFooter({ text: "© FaithChatt Forum" })
    await member.send({ embeds: [welcomeEmbed] }).then(async () => {
      await member.roles.add(faithchatt.rolesId.unverified).catch(e => {})
      await member.roles.add(faithchatt.rolesId.divProfile).catch(e => {})
      await member.roles.add(faithchatt.rolesId.divPing).catch(e => {})
    }).catch(e => {})
})

client.on('guildBanAdd', async member => {
  client.channels.cache.get(faithchatt.textId.goodbye).send(`Unfortunately, **__${member.user.tag}__** is exiled due to breaking one of the rules.\nWe hope and remember for their repentance and submission to the Gospel of Christ.`).catch(e=>{})
})