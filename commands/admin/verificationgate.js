const { WebhookClient, MessageEmbed } = require("discord.js");
module.exports.run = async(client, message, args, prefix) => {
    if(!message.author.id === "136292974379270144") return message.delete()
    const webhook = new WebhookClient({
      id: "940073714995843192",
      token: "FeO-Aje7WNoJ9gSZCbNEwbqUYljI9PlAKEsA3O7o_XXjm-63NQS7y4ZVR6rYJWaUHV-g",
    });
    const embed =  new MessageEmbed()
        .setTitle('Verification Questions')
        .setDescription(`1. What made you come to the server?\n2. Where did you find the invite link?\n3. What is your age and gender?\n4. How do you describe God as?\n5. Ping an active staff member once you're done.\n\n**To all staff members:**\nIf they're good enough to join, you may execute this command:\n\`!verify <@user/userid>\``)
        .setImage('https://media1.giphy.com/media/z1kL3TjrK278E6EhZF/giphy.gif?cid=790b7611e06601e976e82fa774ae08ceab4bd86a1f6672ea&rid=giphy.gif&ct=g')
        .setColor("#ffd100")
        .setFooter({ text: "© FaithChatt Forum" })
    await webhook.send({ content: "Welcome to FaithChatt Forum! Please read the <#839896314963296277> then head back to this channel for answering the questions.", embeds: [embed] })
}

module.exports.command = {
  name: "verifywebhook",
  aliases: []
}