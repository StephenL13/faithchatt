const client = require(`../index.js`).client;

client.on('messageCreate', async message => {
    let links = ["grabify.link", "lovecalculator.site", "discordj.gift", "discord.gift", "discordnitro.gift", "discord.link"];
    for (let i in links) {
        if(message.content.toLowerCase().includes(links[i])) {
            try {
                await message.delete().catch(e=>{});
                return message.author.send({ content: "**You are not allowed to send suspicious links! Failure to abide in the server rules will result into a moderator action.**" }).catch(e => {});
            } catch (error) {
                console.log(error);
            };
        }
    }
})