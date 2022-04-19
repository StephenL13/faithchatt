const { MessageEmbed } = require('discord.js')
const { textId, parentId, rolesId } = require('../../variablehandler.js');
const schema = require('../../model/botconfig.js')
module.exports.run = async(client, message, args, prefix) => {
    const modcheck = message.member.permissions.has("KICK_MEMBERS") || message.member.permissions.has("BAN_MEMBERS") || message.member.permissions.has("ADMINISTRATOR")
    if(modcheck) {
        let config = args[0];
        let boolString = args[1];

        let data = await schema.findOne({ guildId: message.guild.id });
        if(!data) data = await schema.create({ guildId: message.guild.id });

        const configDefaultEmbed = new MessageEmbed()
            .setTitle("This is not a valid configuration.")
            .setDescription("Either it is yet to be developed or not available in your query.")
            .setColor("#ff0000");
        const boolDefaultEmbed = new MessageEmbed()
            .setTitle("This is not a valid choice.")
            .setDescription("To enable or disable configurations, it must be \`ON\` / \`OFF\`.")
            .setColor("#ff0000");
        const successEmbed = new MessageEmbed()
            .setTitle("Bot config successful.")
            .setColor("#ffd100")
        
        if(!config) return message.channel.send({ embeds: [
            new MessageEmbed()
            .setTitle("List of Sub-Commands")
            .setAuthor({ name: "Command usage: !config [name] [on/off]" })
            .setDescription('\`autoclose\` - Automatically closes the verification ticket if member leaves.\n\`verifylock\` - Locks the verification button to public (applicable to raids)')
            .setColor('#ffd100')
        ] })
        switch(config) {
            case "autoclose": {
                if(boolString === 'on') {
                    data.verifyAutoClose = true;
                    await data.save();
                    await message.react('✅');
                    return message.channel.send({ embeds: [successEmbed.setDescription("You have **enabled** the autoclose of verification channels.")] });
                } else if (boolString === 'off') {
                    data.verifyAutoClose = false;
                    await data.save();
                    await message.react('✅');
                    return message.channel.send({ embeds: [successEmbed.setDescription("You have **disabled** the autoclose of verification channels.")] });
                } else return message.channel.send({ embeds: [boolDefaultEmbed] });
            } break;
            case "verifylock": {
                if(boolString === 'on') {
                    data.verifyLock = true;
                    await data.save();
                    await message.react('✅');
                    return message.channel.send({ embeds: [successEmbed.setDescription("You have **locked** the verification system.")] });
                } else if (boolString === 'off') {
                    data.verifyLock = false;
                    await data.save();
                    await message.react('✅');
                    return message.channel.send({ embeds: [successEmbed.setDescription("You have **unlocked** the verification system.")] });
                } else return message.channel.send({ embeds: [boolDefaultEmbed] });
            } break;
            default: return message.channel.send({ embeds: [configDefaultEmbed] });
        }
    } else {
        message.delete();
        const inaccessEmbed = new MessageEmbed()
            .setColor("#ff0000")
            .setDescription('❌ You are not a staff member authorized to use this command.');
        message.author.send({ embeds: [inaccessEmbed] }).catch(e => {})
    }
};

module.exports.command = {
    name: "config",
    aliases: ["cfg"]
};