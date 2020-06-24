module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const userData = new db.table("user");
  let bal = userData.get(`u${message.author.id}.cr`);
  let banklvl = userData.get(`u${message.author.id}.banklvl`);
  let lvl2 = banklvl+1;
  let cost = 0;
  let count = args[0];
  
  if (count) {
    if (banklvl < 30) return message.channel.createMessage("**Sorry!** You must be level 30+ to upgrade multiple times!");
    if (isNaN(parseInt(count))) return message.channel.createMessage("**Sorry!** You must input a valid number!");
    //cost = (900*banklvl-15800)*(1.09^count)
  } else if (!count) {
      if (banklvl <= 15) {
      cost = 200*banklvl+700;
    } else if (banklvl > 15 && banklvl <= 30) {
      cost = 500*banklvl-3800;
    } else if (banklvl >= 31) {
      cost = 900*banklvl-15800;
    };
  };
  console.log(cost);
  if (bal < cost) {
    message.channel.createMessage(`**Sorry!** You need **${cost} CR** to upgrade your bank to **level ${lvl2}!**`);
    return;
  }
  
  userData.subtract(`u${message.author.id}.cr`, cost)
  userData.add(`u${message.author.id}.banklvl`, 1);
  
  message.channel.createMessage(`**Success!** ur bank has been upgwaded to levelllll ${lvl2}!!!!`);
  
};
module.exports.config = {
  name: "upgradebank",
  aliases: ["upbank","bankup"],
  description: "Upgrade your bank capacity!"
};