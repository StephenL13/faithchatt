const client = require('../index.js').client

client.on('messageCreate', async message => {
    // An array of detected profane words from Dyno (LORD FORGIVE ME LOL)
    const profanity = ["anal","anus","arse","ass","bitch","b1tch","ballsack","bastard","biatch","blowjob","bollock","bullock","boner","boob","boobs","buttplug","clitoris","cock","cum","c0m","cunt","damn","dick","d1ck","dildo","d1ldo","d1ld0","dild0","dlld0","dyke","erection","fag","faggot","feck","fellate","fellatio","felching","fuck","fucking","fucksake","fucks","fudgepacker","genitals","jerk","jizz","knobend","labia","mastrubate","muff","nigger","nigga","penis","piss","poop","pube","pussy","scrotum","shit","sh1t","sh!t","slut","s1ut","smegma","smd","spunk","tit","titties","tities","tranny","trannies","tosser","turd","twat","vagina","wank","whore","tits","titty","asshole","fvck","asshat","pu55y","pen1s","nigg","fuk","cnut","b!tch","c0ck"]
    let foundInText = false
    for (let i in profanity) {
        if(message.content.toLowerCase().split(' ').includes(profanity[i])) foundInText = true
    }

    if(foundInText) {
        await message.reply("**❌ Watch your language. Swearing is NOT allowed!**").then((m => {
            setTimeout(() => m.delete(), 10000).catch(e=>{})
        })).catch(e=>{})
        await message.delete().catch(e=>{})
    }
})