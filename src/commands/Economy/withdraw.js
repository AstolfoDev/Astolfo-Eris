module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const userData = new db.table("user");
  let user = userData.get(`u${message.author.id}`);
  var amount = args[0];
  var errorMsg;
  let successMsg;
  let fail = async () => {
    message.channel.createMessage({
      embed: {
        title: "**Heh heh heh**",
        color: 0xde1073,
        author: { name: message.author.tag, icon_url: message.author.avatarURL },
        footer: { text: "Astolfo.js", icon_url: client.user.avatarURL },
        description: `There waz a problemz:\n${errorMsg}\n\nSyntax: /withdraw <amount/max>`
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
    errorMsg = "pls specify an amount to withdraw!!!";
    return fail();
  } else if (isNaN(parseInt(amount))) {
    if (amount.toLowerCase() != "max") {
      errorMsg = "thats not a valid number!!";
      return fail();
    };
  } else if (user.bank < parseInt(Math.round(amount))) {
    errorMsg = "u dont haz dat many credits in ur bank!!";
    return fail();
  } else if (parseInt(Math.round(amount)) < 1) {
    errorMsg = "u cans withdraw less than 1 credit!!";
    return fail();
  };
  if (amount.toLowerCase() == "max") {
    var amt = user.bank;
    userData.set(`u${message.author.id}.bank`, 0);
    userData.add(`u${message.author.id}.cr`, amt);
    successMsg = `**${amt} CR** withdrawn!!!`;
    return success();
  } else {
    userData.subtract(`u${message.author.id}.bank`, parseInt(Math.round(amount)));
    userData.add(`u${message.author.id}.cr`, parseInt(Math.round(amount)));
    successMsg = `**${Math.round(amount)} CR** withdrawn!!!`;
    return success();
  };
};
module.exports.config = {
  name: "withdraw",
  aliases: ["with"],
  description: "Withdraw stuff"
}