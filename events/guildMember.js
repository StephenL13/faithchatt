const client = require('../index.js').client
const { MessageEmbed } = require('discord.js');

client.on('guildMemberAdd', member => {
  const welcomeEmbed = new MessageEmbed()
    .setTitle("Welcome to FaithChatt Forum!")
    .setDescription(`Thank you for joining us here on Discord. We are here to provide Bible studies to the entire world, fellowship with friends, Christian discipleship, and to share the gospel daily. Thanks for helping us proclaim the love of Jesus Christ virtually. Don't forget to read the <#839896314963296277> and click the button, or you will be unable to type anything. Also, don't forget to check out our <#843352934595166239>`)
    .setImage('https://media1.giphy.com/media/z1kL3TjrK278E6EhZF/giphy.gif?cid=790b7611e06601e976e82fa774ae08ceab4bd86a1f6672ea&rid=giphy.gif&ct=g')
    .setColor("#ffd100")
    .setFooter({ text: "© FaithChatt Forum" })
    member.send({ embeds: [welcomeEmbed] }).then(() => {
      member.roles.add('908240970523492353').catch(e => {})
      member.roles.add('929740383892672552').catch(e => {})
    }).catch(e => {})
})

client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
    if (!oldMember.roles.cache.has("839720518213959701") && newMember.roles.cache.has("839720518213959701")) {
      const welcome = new MessageEmbed()
        .setColor("#ffd100")
        .setTitle(`Welcome to FaithChatt!`)
        .setDescription(`Be sure to check out our <#922188972854231160>  and review our <#843352934595166239> as you begin working with us. It gives you access to specific channels, a new color, and important reminders pings.\n\nYou may also want to review our <#839725174912057354> and share a little bit about yourself. We make it easy and even provide a template to follow. Thanks for joining.`)
        .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter({text: `UID: ${newMember.user.id}`})
        .setTimestamp()
      client.channels.cache.get(`839722094798700555`).send({ content: `<@&912259335881650176>, ${newMember} has arrived!`, embeds: [welcome] });
    };
  };
});