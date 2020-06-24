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
        description: `${errorMsg}\nSyntax: /coinflip [heads/tails] (amount to bet)`
      }
    });
  };
  var choice = args[0];
  var bet = args[1];
  var finalText;
  
  if (!choice) {
    errorMsg = "u forgotz to choose heads or tails, silly!";
    return fail();
  }
  choice = choice.toLowerCase();
  if (choice != "h" && choice != "t" && choice != "heads" && choice != "tails") {
    errorMsg = `${choice} is not a valid option! u must pick either heads or tails...`;
    return fail();
  }
  
  var headsTails = [Math.floor(Math.random()*2)];
  var result;
  var winFail;
  
  if (headsTails == 0) {
    result = "heads";
    if (choice == "heads" || choice == "h") {
      winFail = "won";
    }
    else if (choice == "tails" || choice == "t") {
      winFail = "lost";
    };
  }
  else if (headsTails == 1) {
    result = "tails";
    if (choice == "heads" || choice == "h") {
      winFail = "lost";
    }
    else if (choice == "tails" || choice == "t") {
      winFail = "won";
    };
  };
  
  
  let final = async () => {
    //message.channel.createMessage({ embed: { title: "**Result**", color: 0xde1073, thumbnail: {url: client.user.avatarURL }, author: { name: message.author.tag, icon_url: message.author.avatarURL }, footer: { text: "Astolfo.js", icon_url: client.user.avatarURL }, description: finalText } });
    message.channel.createMessage(`${finalText}`)
  };
  
  if (!bet) {
    finalText = `u flipped ${result} and ${winFail}!`
    return final();
  }
  
  if (isNaN(parseInt(bet))) {
    errorMsg = `${bet} is not a valid number of credits for ur bet!!!`;
    return fail();
  }
  
  var checkBal = userData.get(`u${message.author.id}.cr`);
  
  if (bet > checkBal) {
    errorMsg = `u bet ${bet} credits but u only has ${checkBal} credits!!!`;
     return fail();
  }
  
  if (bet < 1) {
    errorMsg = `u canz bet less than 1 credit!! :(`;
    return fail();
  }
  
  var prize = parseInt(bet);
  var loss = prize;
  
  if (winFail == "won") {
    userData.add(`u${message.author.id}.cr`, prize);
    let newBal = userData.get(`u${message.author.id}.cr`);
    finalText = `**You win!** ${message.author.mention} u now hazzzz ${newBal} cwedits!!`;
    return final();
  }
  else if (winFail == "lost") {
    userData.subtract(`u${message.author.id}.cr`, loss);
    let newBal = userData.get(`u${message.author.id}.cr`);
    finalText = `**You lose!** ${message.author.mention} u now hazzzzzz ${newBal} cwedits!!`;
    return final();
  };
  
};
module.exports.config = {
  name: "coinflip",
  aliases: ["cf","flip"],
  description: "Flip a coin and bet on heads or tails!"
}