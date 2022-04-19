const client = require(`../index.js`).client
const { createCmd } = require('../dataHandler')
client.on('ready', async () => {
  const humanCount = await client.guilds.cache.get('839708279973478430').members.cache.filter(member => !member.user.bot).size
  const arrayStatus = [
    `${humanCount} members`,
    `Sola Gratia`,
    `Sola Fide`,
    `Sola Scriptura`,
    `Solus Christus`,
    `Soli Deo Gloria`,
    `discord.gg/faithchatt`,
  ]
  let index = 0;
  setInterval(() => {
    if(index === arrayStatus.length) index = 0;
    const status = arrayStatus[index];
    client.user.setActivity(status, { type: "PLAYING" });
    index++;
  }, 5000)
  console.log('The bot is ready!')
  
  // initialize slash commands; server ID: 839708279973478430
  createCmd(client, "839708279973478430")
});

// ADD ERROR LOGGING WHEN BOT FAILS TO START

client.on('shardError', (error) => {
  console.error(error)
})

client.on('unhandledRejection', error => {
  console.log('Test error:', error);
});