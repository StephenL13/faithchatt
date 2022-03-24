const { MessageEmbed } = require('discord.js')
const { textId, parentId, rolesId } = require('../../variablehandler.js');
const schema = require('../../model/botconfig.js')
module.exports.run = async(client, message, args, prefix) => {
    if(message.member.roles.cache.has(rolesId.staff)) {
        if(message.member.permissions.has("MANAGE_ROLES")) {
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
                .setDescription('\`autoclose\` - Automatically closes the verification ticket if member leaves.')
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
                default: return message.channel.send({ embeds: [configDefaultEmbed] });
            }
        } else return message.delete();
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
    aliases: []
};