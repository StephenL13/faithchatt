const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, message, args, prefix) => {
    if(message.member.permissions.has("MANAGE_ROLES")) {
        const moderatorrole = message.guild.roles.cache.get('871058889339207681')
        const memberrole = message.guild.roles.cache.get('839720518213959701')
        const unverified = message.guild.roles.cache.get('940052640472109117')
        let targetmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!message.channel.parentId == "940053879264006165") {
            return message.delete().then(async() => {
                await message.author.send("You can only execute this on the verification gate.").catch(e => {})
            }).catch(e => {})
        } else {
            const embed = new MessageEmbed()
                .setTitle("Congratulations! You have been verified.")
                .setDescription("To get your roles, please visit the <#922188972854231160> channel.")
                .setThumbnail("https://cdn.discordapp.com/attachments/855630577105502228/904092673353334884/FaithChatt_Halo.png")
                .setColor("#ffd100")
                .setFooter({ text:"© FaithChatt Forum" });
            if(!args[0]) return message.channel.send('Correct command usage:\n\`!verify <@user/userid>\`').catch(e => {})
            if(!targetmember) return message.channel.send('**Please mention a user.**\n\nCorrect command usage:\n\`!verify <@user/userid>\`').catch(e => {})
            if(!moderatorrole) return message.delete().then(async () => {
                await message.author.send("You're not a staff member authorized to use this command.");
                }).catch((e) => {});
            if(!targetmember.roles.cache.has(memberrole)) return message.channel.send("⚠ Member has been already verified!")
            await message.react('✅')
            await targetmember.roles.add(memberrole).then(() => targetmember.roles.remove(unverified)).catch(e => {})
            await targetmember.send({ embeds: [embed] }).catch(e => console.log(`⚠ I'm confirming ${targetmember}'s verification, but his/her DMs are closed!`))
        }
    } else {
        message.delete();
        message.author.send('You are not a staff member authorized to use this command.')
    }
}

module.exports.command = {
    name: "verify",
    aliases:[]
}