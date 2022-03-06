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

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
    if (!oldMember.roles.cache.has(faithchatt.rolesId.member) && newMember.roles.cache.has(faithchatt.rolesId.member)) {
      const welcome = new MessageEmbed()
        .setColor("#ffd100")
        .setTitle(`Welcome to FaithChatt!`)
        .setDescription(`Be sure to check out our <#${faithchatt.textId.roles}> and review our <#${faithchatt.textId.confidentiality}> as you begin working with us. It gives you access to specific channels, a new color, and important reminders pings.\n\nYou may also want to review our <#${faithchatt.textId.introduction}> and share a little bit about yourself. We make it easy and even provide a template to follow. Thanks for joining.`)
        .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter({text: `UID: ${newMember.user.id}`})
        .setTimestamp()
      client.channels.cache.get(faithchatt.textId.general).send({ content: `<@&${faithchatt.rolesId.welcomeping}>, ${newMember} has arrived!`, embeds: [welcome] }).catch(e=>{});
    };
    if (!oldMember.roles.cache.has(faithchatt.rolesId.booster) && newMember.roles.cache.has(faithchatt.rolesId.booster)) {
      const boosterDM = new MessageEmbed()
        .setColor(`#f47fff`)
        .setTitle('Thank you for boosting!')
        .setDescription(`<a:boost:859414318771470377> This will help FaithChatt expand our abilities in making our fellow members interactive all for the glory of God!`)
      newMember.send({ embeds: [boosterDM] })
      client.channels.cache.get(faithcnatt.textId.booster).send({ 
        content: `${newMember}`,
        embeds: [{
          title: "Member has boosted our server!",
          description: `Thank you and may God bless you, **${newMember.user.tag}**!`,
          color: 0xf47fff,
          footer: { text: "© FaithChatt Forum" }
        }]
      }) 
    }
  };
});

client.on('guildBanAdd', async member => {
  client.channels.cache.get(faithchatt.textId.goodbye).send(`Unfortunately, **__${member.user.tag}__** is exiled due to breaking one of the rules.\nWe hope and remember for their repentance and submission to the Gospel of Christ.`).catch(e=>{})
})