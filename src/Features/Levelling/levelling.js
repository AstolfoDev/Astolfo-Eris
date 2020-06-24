module.exports.run = async (client, msg, args) => {
  const db = require("betterqdb");
  let userData = new db.table("user");
  
  userData.add(`u${msg.channel.guild.id}.${msg.author.id}.xp`, 1);
  var level = userData.get(`u${msg.channel.guild.id}.${msg.author.id}.level`);
  var xp = userData.get(`u${msg.channel.guild.id}.${msg.author.id}.xp`);
  var level2 = level+1;
  var nextLevel;
  const guildData = new db.table("guild");
  let levelUp = async () => {
    if (msg.channel.guild.id == "704276842076569690") return;
    msg.channel.createMessage({
      embed: {
        title: `Level up!`,
        description: `Congratuwulationzzz ${msg.author.mention}, u are now.....\n**levellllll ${level2}**!!!`,
        color: 0xde1073,
        author: {
          name: msg.author.tag,
          icon_url: msg.author.avatarURL
        },
        footer: {
          text: "Astolfo.js",
          icon_url: client.user.avatarURL
        },
      }
    });
    userData.set(`u${msg.channel.guild.id}.${msg.author.id}.level`, level2);
    msg.channel.createMessage(msg.author.mention).then(m => {
      m.delete();
    });
    if (guildData.has(`u${msg.channel.guild.id}.levelling.levels`)) {
      var possibleLevels = guildData.get(`u${msg.channel.guild.id}.levelling`);
      if (possibleLevels.levels.includes(level2)) {
        var roleID = guildData.get(`u${msg.channel.guild.id}.levelling.level.${level2}`);
        msg.member.addRole(roleID);
        
      }
    }
  };
  if (msg.channel.guild.id != "663216506385072148") {
    if (level <= 15) {
      nextLevel = level*200+70;
      if (xp >= nextLevel) {
        levelUp();
      };
      
    } else if (level >= 16 && level <= 30) {
      nextLevel = level*500-380;
      if (xp >= nextLevel) {
        levelUp();
      };
      
    } else if (level >= 31) {
      nextLevel = level*900-1580;
      if (xp >= nextLevel) {
        levelUp();
      };
    }
  }
};