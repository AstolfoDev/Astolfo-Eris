module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const userData = new db.table("user");
 
  var user = message.mentions[0];
  var amount = parseInt(args[1]);
  var currency = args[2];
  
  let invalidSyntax = async () => {
    message.channel.createMessage({
      embed: {
        title: "**Woah woah woah!**",
        color: 0xde1073,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL
        },
        footer: {
          text: "Astolfo.js",
          icon_url: client.user.avatarURL
        },
        description: `SloooOoOOow down there, ${message.author.mention}!!\n${syntaxMsg}`
      }
    });
  }
  var syntaxMsg;
  var syntax = "Syntax: /pay <@user> <amount> [cr/tc/at]";
  if (!user) {
    syntaxMsg = `u forgot to @mention the user you want to pay!\n${syntax}`;
    invalidSyntax();
    return;
  }
  else if (!amount) {
    syntaxMsg = `u forgot to specify how much you want to send!\n${syntax}`;
    invalidSyntax();
    return;
  }
  else if (isNaN(amount)) {
    syntaxMsg = `u haz to put a number for thr amount!\n${syntax}`;
    invalidSyntax();
    return;
  }
  if (amount < 1) {
    syntaxMsg = "u canz send less than 1 credit!!";
    invalidSyntax();
    return;
  }
  else if (!currency) {
    syntaxMsg = `u need to specify the currency!! such as: cr, tc or at\n${syntax}`;
    invalidSyntax();
    return;
  }
  currency = currency.toLowerCase();
  if (currency != "cr" && currency != "tc" && currency != "at") {
    syntaxMsg = "invalid currency!\npls use: CR, TC or AT";
    invalidSyntax();
    return;
  }
  if (user.id == message.author.id) {
    syntaxMsg = "u canzzzz send money to urself!!!!!";
    invalidSyntax();
    return;
  }
  
  let bal1 = userData.get(`u${message.author.id}.${currency}`);
  let bal2 = userData.get(`u${user.id}.${currency}`);
  
  if (bal1 < amount) {
    syntaxMsg = `u dont has enough moneYyYy in your balance to send ${amount} ${currency}!!!!`;
    invalidSyntax();
    return;
  }
  
  userData.subtract(`u${message.author.id}.${currency}`, amount);
  userData.add(`u${user.id}.${currency}`, amount);
  
  return message.channel.createMessage({
    embed: {
      title: "**Transuwuaction compwete!**",
      color: 0xde1073,
      author: {
        name: message.author.tag,
        icon_url: message.author.avatarURL
      },
      footer: {
        text: "Astolfo.js",
        icon_url: client.user.avatarURL
      },
      description: `${message.author.mention} sent ${amount} ${currency} to ${user.mention}!`,
      thumbnail: {
        url: "https://2.bp.blogspot.com/-ltdQvkohcfM/WklSkugqHlI/AAAAAAABB6c/v78mE7ecI7Qc3nYP_hvWA9tvH2LumG74wCKgBGAs/s1600/Omake%2BGif%2BAnime%2B-%2BFate%2BApocrypha%2B-%2BEpisode%2B25%2B%255BEND%255D%2B-%2BAstolfo%2BHugs%2BLaeticia.gif"
      }
    }
  });
  
};
module.exports.config = {
  name: "pay",
  aliases: ["give"],
  description: "Transfer money from your balance to another user!"
};