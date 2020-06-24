module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  let userData = new db.table("user");
  
  if (message.author.id != "193044575500238849") return message.channel.createMessage("oWOooOoO?!?!? u canz use dattttt commanAnAnanananaananand!!1!!1!!");
  
  let user = message.mentions[0];
  if (!user) return message.channel.createMessage("h-huh?!?! u forgot to @mention soMmOoMmOmomomeone!!1'qnqnnqq");
  
  if (args[1] != "playing.state") {
    args[2] = parseInt(args[2]);
  }
  userData.set(`u${user.id}.chess.${args[1]}`, args[2]);
  message.channel.createMessage(`yayyyyy i did it!! ;D`);
};
module.exports.config = {
  name: "set",
  aliases: ["setelo"],
  description: "No lol"
};