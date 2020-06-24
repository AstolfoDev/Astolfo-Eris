module.exports.run = async (client, message, args) => {
  //if (message.author.username != "agent") return;
  const db = require("betterqdb");
  let pizzaData = new db.table("pizza");
  const show = require("./Functions/show.js");
  //pizzaData.delete(`u${message.author.id}`);
  let user = message.author;
  if (message.mentions.length > 0) {
    user = message.mentions[0];
  };
  if (user.bot) return message.channel.createMessage("bots dont eat pizza");
  if (!pizzaData.has(`u${message.author.id}.room`)) {
    message.channel.createMessage("u have no pizzaria, lemme make one for you...");
    pizzaData.set(`u${user.id}.room`, "tlLc22esSc22c22tlL\ntlLc11mgGc11c11tlL\ntlLtlLtlLtlLtlLtlL\npgGtlLtlLtlLtlLtlL")
    pizzaData.set(`u${user.id}.funfactor`, 10)
  }
 
  let pizzaria = pizzaData.get(`u${user.id}.room`);
  
  message.channel.createMessage(`${user.mention}'s Pizzaria`);
  show.run(message, pizzaria);
}
module.exports.config = {
  name: "view",
  aliases: ["v","vp"]
}