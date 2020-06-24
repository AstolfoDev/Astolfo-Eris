module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const userData = new db.table("user");
  let user = message.author;
  if (message.mentions.length > 0) {
    user = message.mentions[0];
  };
  if (user.bot) return message.channel.createMessage("bots dont have rights");
  let bal = { cr: userData.get(`u${user.id}.cr`), tc: userData.get(`u${user.id}.tc`), at: userData.get(`u${user.id}.at`) };
  let banklvl = userData.get(`u${user.id}.banklvl`);
  let bank = userData.get(`u${user.id}.bank`);
  let capacity = banklvl*5000+100;
  message.channel.createMessage({
    embed: {
      title: "**User Balance**",
      thumbnail: { url: user.avatarURL },
      author: { name: user.tag, icon_url: user.avatarURL },
      color: 0xde1073,
      footer: { text: "Astolfo.js", icon_url: client.user.avatarURL },
      fields: [
        {
          name: "**Credits**",
          value: `${Math.floor(bal.cr)}`,
          inline: true
        },
        {
          name: "**Trap Coins**",
          value: Math.floor(bal.tc),
          inline: true
        },
        {
          name: "**Apocrypha Tokens**",
          value: Math.floor(bal.at),
          inline: true
        },
        {
          name: "**Bank Balance**",
          value: `${bank}/${capacity} CR`,
          inline: true
        },
        {
          name: "**Bank Level**",
          value: banklvl,
          inline: true
        },
      ]
    }
  })
  
};
module.exports.config = {
  name: "bank",
  aliases: ["banking","bankbal", "bal"],
  description: "View your balance and bank account!"
}