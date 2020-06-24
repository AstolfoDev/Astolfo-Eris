module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const userData = new db.table("user");
  var errorMsg;
  let fail = async () => {
    message.channel.createMessage({
      embed: {
        title: "**uh ohhh!**",
        color: 0xde1073,
        author: { name: message.author.tag, icon_url: message.author.avatarURL },
        footer: { text: "Astolfo.js", icon_url: client.user.avatarURL },
        thumbnail: { url: client.user.avatarURL },
        description: `${errorMsg}\nSyntax: /dice [1-6] (amount to bet)`
      }
    });
  };
  var choice = args[0];
  var bet = args[1];
  var finalText;
  
  if (!choice) {
    errorMsg = "u forgotz to choose a side (1-6), silly!";
    return fail();
  }
  choice = parseInt(choice);
  if (isNaN(choice) || choice < 1 || choice > 6) {
    errorMsg = `${choice} is not a valid option! u must pick a number between 1-6...`;
    return fail();
  }
  
  var diceRoll = [Math.floor(Math.random()*7)];
  while (diceRoll == 0 || diceRoll == 7) {
    diceRoll = [Math.floor(Math.random()*7)];
  }
  var result;
  var winFail;
  
  if (diceRoll == choice) {
    result = diceRoll;
    winFail = "won";
  }
  else {
    result = diceRoll;
    winFail = "lost";
  }
  
  
  let final = async () => {
    message.channel.createMessage({ embed: { title: "**Result**", color: 0xde1073, thumbnail: {url: client.user.avatarURL }, author: { name: message.author.tag, icon_url: message.author.avatarURL }, footer: { text: "Astolfo.js", icon_url: client.user.avatarURL }, description: finalText } });
  };
  
  if (!bet) {
    finalText = `u rolled a ${result} and ${winFail}!`
    return final();
  }
  
  if (isNaN(parseInt(bet))) {
    errorMsg = `${bet} is not a valid number of trap coins for ur bet!!!`;
    return fail();
  }
  
  var checkBal = userData.get(`u${message.author.id}.tc`);
  
  if (bet > checkBal) {
    errorMsg = `u bet ${bet} trap coins but u only has ${checkBal} trap coins!!!`;
     return fail();
  }
  
  if (bet < 1) {
    errorMsg = `u canz bet less than 1 trap coin!! :(`;
    return fail();
  }
  
  var prize = parseInt(bet*6);
  
  if (winFail == "won") {
    finalText = `u rolled a dice and it landed on ${result}.\nu win ${prize} trap coins!`;
    userData.add(`u${message.author.id}.tc`, prize);
    return final();
  }
  else if (winFail == "lost") {
    finalText = `u rolled a dice and it landed on ${result}.\nu lost ${prize} trap coins!`;
    userData.subtract(`u${message.author.id}.tc`, prize);
    return final();
  };
  
};
module.exports.config = {
  name: "dice",
  aliases: ["roll"],
  description: "Roll a dice and bet on the side it lands on!"
}