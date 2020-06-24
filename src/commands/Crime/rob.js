module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const userData = new db.table("user");
  const ReactionHandler = require("eris-reactions")
  //userData.delete(`u${message.author.id}.cooldowns`);
  //if (message.author.username != "agent") return;
  //if (message.author.id == "261498586611712000");
  const endTime = userData.get(`u${message.author.id}.cooldowns.rob`)
  const coolTime = (5 * 60) * 1000;
  const now = Date.now();
  let user = message.mentions;
  if (userData.has(`u${message.author.id}.cooldowns.rob`)) {
    let expiration = endTime + coolTime;
    if (now > expiration) {
      userData.delete(`u${message.author.id}.cooldowns.rob`);
      userData.set(`u${message.author.id}.cooldowns.rob`, now);
    setTimeout(() => userData.delete(`u${message.author.id}.cooldowns.rob`), coolTime);
      
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
    if (user.length < 1) return message.channel.createMessage(`Hey ${message.author.mention}! u forgwot 2 tag the user you want to rob!!!\n\`Ex: /rob @AstolfoUser#0000\``);
    if (user[0].id == message.author.id) return message.channel.createMessage("u cant rob urselfffff!!!!1!")
    userData.set(`u${message.author.id}.cooldowns.rob`, now);
    setTimeout(() => userData.delete(`u${message.author.id}.cooldowns.rob`), coolTime);
  }
  
  var robberies = 0
  const robOne = require("./Robberies/robbery1.js");
  robberies++
  
  var random = [Math.floor(Math.random()*robberies)];
  

  if (random == 0) {
    robOne.run(client, message, args, user);
  };
  
};
module.exports.config = {
  name: "rob",
  aliases: ["steal"],
  description: "Rob credits from someone!"
};