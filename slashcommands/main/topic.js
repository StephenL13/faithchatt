const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, interaction) => {
  const topic = ["Should Christian have tattoos? Why or why not?", "What happens after death?", "Where was Jesus for the three days between his death and resurrection?", "How does the Old Testament passage reveal Jesus Christ?", "What do we learn about God’s character and nature?", "Do I own my faith?", "Can I trust the Bible? Why?", "How do you describe God as?", "How does free will affect my faith?", "What makes Christianity different than any other religion?", "What is the point of following Christ?", "Why does God allow bad things to happen?", "What is salvation?", "Does pride interfere with faith? Why?", `Based on the song, "Amazing Grace", How is grace so amazing?`, "Is having faith enough to save us?", "Can you become a Christian after you die?", "Is there any sin God will not forgive?", "Did Jesus ever sin?"]
  
  var num = Math.floor(Math.random()*topic.length);
  const embed = new MessageEmbed()
    .setDescription(`**${topic[num]}**`)
    .setColor("#ffd100")
    .setFooter({ text: "© FaithChatt Forum" })
    .setTimestamp()
  interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
};

module.exports.command = {
  name: "topic"
};
