module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  let userData = new db.table("user");
  
    const endTime = userData.get(`u${message.author.id}.cooldowns.peko`)
  const coolTime = (60 * 60) * 1000;
  const now = Date.now();
  let user = message.mentions;
  if (userData.has(`u${message.author.id}.cooldowns.peko`)) {
    let expiration = endTime + coolTime;
    if (now > expiration) {
      userData.delete(`u${message.author.id}.cooldowns.peko`);
      userData.set(`u${message.author.id}.cooldowns.peko`, now);
    setTimeout(() => userData.delete(`u${message.author.id}.cooldowns.peko`), coolTime);
      
    }
    if (now < expiration) {
      const timeLeft = (expiration - now) / 1000;
      if (timeLeft >= 60) {
        
        const mintime = timeLeft/60
        return message.channel.createMessage(`please wait another **${Math.ceil(mintime)}** minutes!`)
      }
      
      if (timeLeft >= 3600) {
        const hourtime = ((timeLeft/60)/60)
        return message.channel.createMesaage(`please wait another **${Math.ceil(hourtime)}** minutes!`)
      }
      else {
        return message.channel.createMessage(`please wait another **${Math.ceil(timeLeft)}** seconds!`);
      };
    }
  } else {
    
    if (!message.member.nick) return message.channel.createMessage(`u must join the peko cult to claim ur peko bonus!\n\`/nick ${message.author.username}-peko\``);
    
    if (!message.member.nick.toLowerCase().includes("peko")) return message.channel.createMessage(`u must join the peko cult to claim ur peko bonus!\n\`/nick ${message.member.nick}-peko\``);
    
    userData.set(`u${message.author.id}.cooldowns.peko`, now);
    setTimeout(() => userData.delete(`u${message.author.id}.cooldowns.peko`), coolTime);
  }
  
  let bonus = Math.floor((parseInt(userData.get(`u${message.author.id}.cr`))*0.01));
  userData.add(`u${message.author.id}.cr`, bonus);
  message.channel.createMessage(`<:astolfoHeart:683035977651847199> **Claimed!** u haz recieved ur hourly peko bonus! (${bonus} cweditzZz)`);
};
module.exports.config = {
  name: "peko",
  aliases: ["peko"]
}