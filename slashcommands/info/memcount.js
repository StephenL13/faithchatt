module.exports.run = async(client, interaction) => {
    const faithchatt = client.guilds.cache.get('839708279973478430')
    const humanMemberCount = faithchatt.members.cache.filter(member => !member.user.bot).size;

    const embed = new MessageEmbed()
    .setColor('#ffd100')
    .setTitle(`We are now on ${humanMemberCount} members!`)
    .setfooter({ text: '©️ FaithChatt Forum' })

    await interaction.reply({ embeds: [embed] })
}
module.exports.command = {
    name: `membercount` 
}