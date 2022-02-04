const { WebhookClient, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.run = async (client, message, args, prefix) => {
  if (message.member.roles.cache.has("839717564128690197")) {
    const wc = new WebhookClient({
      id: '865857071710470214',
      token: 'RvMtok0QEQQVuh2ov3qdtkgiJNW2N-Zf5nRUfsq6DpzRLdRbLGIttAZZfPa4w8GazOxf'
    });
    const row = new MessageActionRow().addComponents(
        new MessageButton()
        .setLabel("I agree to the confidentiality statement.")
        .setStyle("SECONDARY")
        .setEmoji("✅")
        .setCustomId("cstatement")
        .setDisabled("false"),
    )
    const confidentiality = new MessageEmbed()
      .setColor('#ffd100')
      .setTitle('Confidentiality Overview')
      .setDescription(`Before we begin, let's discuss our commitment to honesty and confidentiality. We will be gathering to talk about hard yet sensitive topics. Trust needs to be present in every small group for the participants to share and be vulnerable. We want to encourage you to share honestly about your life. As such, It’s important that we keep all that is shared within this group confidential. In Proverbs 16:28 the Bible speaks about the seriousness of gossip and how it can ruin friendships. As we move forward I'd like everyone to commit to this social agreement of confidentiality. Do not discuss what is been shared in this group (even with other members of the group) without the permission of the individual of whom you’re speaking. However, if the safety of an individual becomes a concern please understand our confidentiality has limits. In some cases a pastor, an elder, or professional counselor may be required.`)
    const confidentiality2 = new MessageEmbed()
      .setColor('#ffd100')
      .setDescription(`For example:\n\n**CASE#1** “My friend Chloe is hurting because her boyfriend broke up with her and started going out with another girl at Barger high school. They have been together for quite a while so it was especially difficult. She's devastated because they dated for two years and his sister Anna is her best friend. Will you pray for her?”\n\n**CASE#2** “My friend is hurting because she and her boyfriend broke up. He started dating someone else and she's really devastated for a lot of reasons. Will you pray for her?”`)
    const confidentiality3 = new MessageEmbed()
      .setColor('#ffd100')
      .setDescription(`We may be able to share the second example with someone who isn't familiar with that crowd or school. But it may not be wise to share so much with someone who might know those parties involved. When we care for others we often want to ask for prayer over the details of their hardship. These details matter to us, and they matter to God, but when asking for prayer for someone else it's better to be cautious and respect their privacy.\n\nThe range of internal struggles we face is as wide as the east from the west. Use a discerning ear in case something more serious comes up about body image, depression, or deep pain (eating disorders, self-harm, abuse, etc). While the group discussions may not be the time to talk about these things you can always follow-up with individual questions later. As long as the participants are not in any danger we always hold things in the strictest of confidence.`)
    const agree = new MessageEmbed()
      .setColor("#ffd100")
      .setTitle("Confidentiality agreement")
      .setDescription("In order to show your willingness to adhere to our social confidentiality agreement, we need you to react to this message by hitting the button below. Doing so will assign you the Good Samaritan role. Thank you.")
      .setThumbnail('https://www.kindpng.com/picc/m/29-295709_file-twemoji-1f607-svg-emoji-angel-clipart-emojis.png')
      .setFooter({ text:"© FaithChatt Forum" });
    wc.send({ embeds: [confidentiality, confidentiality2, confidentiality3, agree] })
  } else return;
};

module.exports.command = {
  name: "confidentialfc",
  aliases: [],
};