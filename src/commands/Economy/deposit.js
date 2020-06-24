module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const userData = new db.table("user");
  const user = { banklvl: userData.get(`u${message.author.id}.banklvl`), cr: userData.get(`u${message.author.id}.cr`), bank: userData.get(`u${message.author.id}.bank`) };
  
  let capacity = user.banklvl*5000+100;
  let amount = args[0];
  var errorMsg;
  let successMsg;
  let fail = async () => {
    message.channel.createMessage({
      embed: {
        title: "**Heh heh heh**",
        color: 0xde1073,
        author: { name: message.author.tag, icon_url: message.author.avatarURL },
        footer: { text: "Astolfo.js", icon_url: client.user.avatarURL },
        description: `There waz a problemz:\n${errorMsg}\n\nSyntax: /deposit <amount/max>`
      }
    }); 
};
  let success = async () => {
    message.channel.createMessage({
      embed: {
        title: "**Whoooop!**",
        color: 0xde1073,
        author: { name: message.author.tag, icon_url: message.author.avatarURL },
        footer: { text: "Astolfo.js", icon_url: client.user.avatarURL },
        description: `${successMsg}`
      }
    }); 
};
  if (!amount) {
    errorMsg = "u fowgot to say how many cwedits u wanted 2 depoZzit!!";
    return fail();
  } else if (isNaN(parseInt(amount))) {
    if (amount.toLowerCase() != "max") {
      errorMsg = "invalid value given for the amount of cwedits u wanna deposit!!";
      return fail();
    };
  } else if (user.cr < amount) {
    errorMsg = "u dont haz that many cwredits!!!!";
    return fail();
  } else if (amount > capacity) {
    errorMsg = "u dont have enough space in ur bank to fit that many credits! use \`max\` to fill it to the limit!";
    return fail();
  } else if (amount < 1) {
    errorMsg = "u cant deposit less than 1 credit!!1!1";
    return fail();
  };
  
  if (amount.toLowerCase() == "max") {
    
    var amt = user.cr;
    if (user.cr > (capacity-user.bank)) {
      amt = capacity-user.bank
    }
    userData.add(`u${message.author.id}.bank`, Math.round(parseInt(amt)));
    userData.subtract(`u${message.author.id}.cr`, Math.round(parseInt(amt)));
    successMsg = `**${amt} CR** was deposited to ur account!!`;
    return success();
  } else {
    userData.add(`u${message.author.id}.bank`, Math.round(amount));
    userData.subtract(`u${message.author.id}.cr`, Math.round(parseInt(amount)));
    successMsg = `**${Math.round(amount)} CR** was deposited to ur account!!`;
    return success();
  };
};
module.exports.config = {
  name: "deposit",
  aliases: ["dep"],
  description: "Deposit your credits!"
}