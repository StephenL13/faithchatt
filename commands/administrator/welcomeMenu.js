const { WebhookClient, MessageEmbed } = require('discord.js')

module.exports.run = async (client, message, args, prefix) => {
  if (message.member.roles.cache.has("839717564128690197")) {
    const wc_rules = new WebhookClient({
      id: '865439061242150962',
      token: 'ivEQeO2RDTGWVHo_BRVwfnEa48qd8hJIo0v8duRMViJagQDhM2qQIF9ZZJl2dROduUYL'
    });
    const wc_roles = new WebhookClient({
      id: "922189907642957934",
      token: "xXrBBzDwHDZawwinB5LhEXRFx75I5PpFesU8mIRsUGnO_90ZvPaKRf5eihja6u2eKWeV"
    })

    try {
      const rule_intro = new MessageEmbed()
        .setColor('#ffd100')
        .setTitle('Welcome to the server!')
        .setDescription('FaithChatt is not just another server but a Christ-centered ministry that desires to reach people around the world with Biblical TRUTH and its application 24/7/365.')
      const rule1 = new MessageEmbed()
        .setColor('#ffd100')
        .setTitle('12 Rules to Remember')
        .setDescription(`1. Watch your tongue and refrain from using crude, bathroom, or sexual humor. Be respectful and loving at all times. Racial slurs are not tolerated. Profanity is not allowed. Name calling is not allowed; this includes derogatory spellings of denominations. Toxicity will not be allowed.\n\n2. Offending people because you shared the truth isn’t necessarily wrong, but we never want to create a stumbling block for other believers in the body of Christ. The main goal for a Christian is to "be the Light" and tell others about Christ. Love others as Christ loves you. (If you see a fellow Christian expressing clearly heretical/un-Christian beliefs, attempt to correct them with scripture directly, but remember to do so lovingly. If needed, follow the precepts in <#843342075499118643> for resolutions)\n\n3. Sexual media of any sort will not be tolerated and will result in a perma-ban. Please keep usernames and avatars clean. You may be muted, kicked, or banned based on the severity of your username or profile pic. Keep it clean people.\n\n4. Intentional spamming will not be tolerated. Bot spam, as well as other kinds of light spam, are NOT allowed here. Memeing in our channels is ONLY allowed if it is relevant and does not derail conversations.\n\n5. Advertising is not allowed without first asking a staff member. They must relate to Christ in some capacity. We do want to partner with other servers united under our flag of the Five Solas. Do not advertise events happening on other servers without that prior approval.\n\n6. We respect your privacy and expect the same from our members. Doxxing and/or sharing private information of another user without their consent may result in an instant permaban! Be sure to read our guidelines and adhere to our **Confidentiality Agreement** at <#843352934595166239> upon arrival. We want to respect everyone's privacy here.`)
      const rule2 = new MessageEmbed()
        .setColor('#ffd100')
        .setDescription("7. Non-Christians should NOT argue against the Nicene Creed. However we welcome open discussion with those interested in learning about it. Proselytization by non-Christians will result in a warning, kick, or ban.\n\nNOTE: We define a Christian as someone who affirms the Nicene Creed.\n\n```\nWe believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible.\n\nAnd in one Lord Jesus Christ, the only-begotten Son of God, begotten of the Father before all worlds (æons), Light of Light, very God of very God, begotten, not made, being of one substance with the Father; by whom all things were made; who for us men, and for our salvation, came down from heaven, and was incarnate by the Holy Ghost of the Virgin Mary, and was made man; he was crucified for us under Pontius Pilate, and suffered, and was buried, and the third day he rose again, according to the Scriptures, and ascended into heaven, and sitteth on the right hand of the Father; from thence he shall come again, with glory, to judge the quick and the dead; whose kingdom shall have no end.\n\nAnd in the Holy Ghost, the Lord and Giver of life, who proceedeth from the Father and the Son, who with the Father and the Son together is worshiped and glorified, who spake by the prophets. In one holy catholic and apostolic Church; we acknowledge one baptism for the remission of sins; we look for the resurrection of the dead, and the life of the world to come. Amen.\n```")
      const rule3 = new MessageEmbed()
        .setColor('#ffd100')
        .setDescription("8. Sometimes conversations get heated, so take a break if you're feeling stressed. If the Admins/Mods think that a discussion is taking a turn for the worse, we may mute you temporarily for your own good or block the chat for a few minutes so things can cool down. Be loving at all times\n\n" + `9. Attempts at converting your fellow Christian are NOT allowed. We’re not here to pull believers from one church to another. However discussions on the merits of different denominations are allowed, but blatant conversion attempts are not. We like to focus on the Union with Christ here. (You may discuss, civilly, why you believe a denomination to be wrong or discuss why you believe it to be the truth. But, saying "Become <denomination>" is not allowed. If it is felt you are, too frequently, starting debates on why your denomination is correct, you will be spoken with and further action will be taken from there)\n\n` + "10. Anyone (including non-Christians) who come in looking for a fight or to simply push their ideas will be removed. Coming into the server without the intention to focus on Christ will not be tolerated. Toxic members may be kicked or banned without warning if staff feels you are a detriment to the server.\n\n11. Denomination bashing is a violation of server policy. In order to prevent this from happening, we ask that members maintain respect of each other’s denomination. Be aware of Rule 9, as well as the importance in maintaining LOVE for one another. We're all part of the body of Christ.\n\n12. These rules are not all of which governs this server. Moderators have discretion to act when it is felt an action is detrimental to the well being of the server and its members. Love others as Christ loves you. Failure to follow any of these rules may result in a mute, kick, or permaban.")
      wc_rules.send({ embeds: [rule_intro, rule1, rule2, rule3] });
    } catch (error) {
      console.log(error)
    }

    try {
      const border_image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.pngio.com%2Fdivider-png-96-images-in-collection-page-1-divider-png-1000_200.png&f=1&nofb=1"

      const religion = new MessageEmbed()
        .setColor('#ffd100')
        .setTitle("CHRISTAN / NON-CHRISTIAN")
        .setDescription(':one: Christian\n:two: Non-Christian')
        .setImage(border_image)
      const gender = new MessageEmbed()
        .setColor('#ffd100')
        .setTitle("GENDER ROLES")
        .setDescription(':male_sign: Male\n:female_sign: Female')
        .setImage(border_image)
      const age = new MessageEmbed()
        .setColor('#ffd100')
        .setTitle("AGE ROLES")
        .setDescription(':person_bouncing_ball: Below 18 years old\n:person_golfing: Above 18 years old')
        .setImage(border_image)
      const continent = new MessageEmbed()
        .setColor('#ffd100')
        .setTitle("LOCATION ROLES")
        .setDescription(':one: North America\n:two: South America\n:three: Europe\n:four: Africa\n:five: Asia\n:six: Oceania')
        .setImage(border_image)
      const serverroles = new MessageEmbed()
        .setColor('#ffd100')
        .setTitle("SERVER PINGS/OTHER ROLES")
        .setDescription(':postal_horn: Special Announcement Ping\n:calendar: Daily Devotional Ping\n:scroll: Verse of the Day Ping\n:mortar_board: Dead Theologians Ping\n:bar_chart: Poll Ping\n:video_game: Gamer Ping\n:bell: Disboard Bump\n:book: Bible Study Ping\n:sunglasses: Lesson Ping\n:books: Reading Scripture Ping\n:green_book: Reading Ping\n:musical_keyboard: Worship Night Ping\n:cross: Prayers/Intercession Ping\n:pray: Prayer Requests Ping\n:wave: Welcoming Committee\n:sparkles: Other Events')
        .setImage(border_image)
      wc_roles.send({ embeds: [religion] })
      wc_roles.send({ embeds: [gender] })
      wc_roles.send({ embeds: [age] })
      wc_roles.send({ embeds: [continent] })
      wc_roles.send({ embeds: [serverroles] })
    } catch (error) {
      console.log(error)
    }
  } else return;
};

module.exports.command = {
  name: "wmenufc",
  aliases: [],
};