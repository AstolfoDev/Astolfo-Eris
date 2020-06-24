module.exports.run = async (client, message, args) => {
  //if (message.author.username != "agent") return;
  const db = require("betterqdb");
  let pizzaData = new db.table("pizza");
  let userData = new db.table("user");
 //userData.delete(`u${message.author.id}.cooldowns.shift`);
  if (!pizzaData.has(`u${message.author.id}.room`)) {
    message.channel.createMessage("u have no pizzaria, lemme make one for you...");
    pizzaData.set(`u${message.author.id}.room`, "tlLc22esSc22c22tlL\ntlLc11mgGc11c11tlL\ntlLtlLtlLtlLtlLtlL\npgGtlLtlLtlLtlLtlL")
    pizzaData.set(`u${message.author.id}.funfactor`, 10)
  }
  const endTime = userData.get(`u${message.author.id}.cooldowns.shift`)
  const coolTime = 600 * 1000;
  const now = Date.now();
  let user = message.mentions
  if (userData.has(`u${message.author.id}.cooldowns.shift`)) {
    let expiration = endTime + coolTime;
    if (now > expiration) {
      userData.delete(`u${message.author.id}.cooldowns.shift`);
      userData.set(`u${message.author.id}.cooldowns.shift`, now);
    setTimeout(() => userData.delete(`u${message.author.id}.cooldowns.shift`), coolTime);
      
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
      }
    }
  } else {
    userData.set(`u${message.author.id}.cooldowns.shift`, now);
    setTimeout(() => userData.delete(`u${message.author.id}.cooldowns.shift`), coolTime);
  }

  var games = 0
  const gameOne = require("./Games/game1.js");
  games++
  
  var random = [Math.floor(Math.random()*games)];
  
  let purple = false;
  if (!pizzaData.has(`u${message.author.id}.3`)) {
    let random = [Math.floor(Math.random()*2)];
    if (random == 0) purple = true;
  } else {
    let random = [Math.floor(Math.random()*4)];
    if (random == 0) purple = true;
  }
  
  if (random == 0) {
    await gameOne.run(client, message, args, purple);
  }

}
module.exports.config = {
  name: "shift",
  aliases: ["sh"]
}