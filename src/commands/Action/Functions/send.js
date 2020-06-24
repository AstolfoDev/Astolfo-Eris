module.exports.run = async (client, message, args, action, msg, user1, user2, query) => {
  const Tenor = require("tenorjs").client({
    "Key": "F0UCLK5OBW4E",
    "Filter": "off",
    "Locale": "en_GB",
    "MediaFilter": "minimal",
    "DateFormat": "D/MM/YYYY - H:mm:ss A"
  });
  
  if (user1.id == user2.id) {
    user2 = user1;
    user1 = client.user;
    message.channel.createMessage("dont worrrRrrY, astOwOlfo is here forrtrr u!!!!1!");
  }
  
  let result = await Tenor.Search.Random(query, "1").catch(console.error);
  let index = [Math.floor(Math.random()*result.length)];
  message.channel.createMessage({
    embed: {
      description: `${user1.mention} ${msg} ${user2.mention}`,
      color: 0xde1073,
      image: { url: result[index].media[0].gif.url },
      footer: { text: "Astolfo.js", icon_url: client.user.avatarURL }
    }
  })
}