module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const userData = new db.table("user");
  
  let user = message.author;
  if (message.mentions.length > 0) {
    user = message.mentions[0];
  };
  if (user.bot) return message.channel.createMessage("bots dont deserve profiles");
  
  var level = userData.get(`u${message.channel.guild.id}.${user.id}.level`);
  var xp = userData.get(`u${message.channel.guild.id}.${user.id}.xp`)+1
  var nextLevel;
  
  var credits = userData.get(`u${user.id}.cr`);
  var trapcoins = userData.get(`u${user.id}.tc`);
  var tokens = userData.get(`u${user.id}.at`);
  var bio = userData.get(`u${user.id}.bio`);
  
  if (level <= 15) {
      nextLevel = level*200+70;
    } else if (level >= 16 && level <= 30) {
      nextLevel = level*500-380;
    } else if (level >= 31) {
      nextLevel = level*900-1580;
    };
    
  message.channel.createMessage({
    embed: {
      title: `${user.username}'s Profile`,
      author: {
        name: user.tag,
        icon_url: user.avatarURL
      },
      footer: {
        text: "Astolfo.js",
        icon_url: user.avatarURL
      },
      color: 0xde1073,
      fields: [
        {
          name: "**Current Level**",
          value: level,
          inline: true
        },
        {
          name: "**Exp. Points**",
          value: `${xp}/${nextLevel}`,
          inline: true
        },
        {
          name: "**Credits**",
          value: `${credits} CR`,
          inline: true
        },
        {
          name: "**Trap Coins**",
          value: `${trapcoins} TC`,
          inline: true
        },
        {
          name: "**Apocrypha Tokens**",
          value: `${tokens} AT`,
          inline: true
        },
        {
          name: "**Bio**",
          value: bio,
          inline: true
        }
      ],
      thumbnail: {
        url: user.avatarURL
      }
    }
  });
  
};
module.exports.config = {
  name: "level",
  aliases: ["levelinfo", "xp", "profile"],
  description: "View your current XP and level."
};