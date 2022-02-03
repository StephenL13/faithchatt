const client = require('../index.js').client
const { MessageEmbed } = require('discord.js');

client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
    if (!oldMember.roles.cache.has("839720518213959701") && newMember.roles.cache.has("839720518213959701")) {
      const welcome = new MessageEmbed()
        .setColor('YELLOW')
        .setTitle(`Welcome to FaithChatt!`)
        .setDescription(`Be sure to check out our <#922188972854231160>  and review our <#843352934595166239> as you begin working with us. It gives you access to specific channels, a new color, and important reminders pings.\n\nYou may also want to review our <#839725174912057354> and share a little bit about yourself. We make it easy and even provide a template to follow. Thanks for joining.`)
        .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `UID: ${newMember.user.id}` })
        .setTimestamp()
      client.channels.cache.get(`839722094798700555`).send({ content: `<@&912259335881650176>, ${newMember} has arrived!`, embeds: [welcome] });
    };
  };
});