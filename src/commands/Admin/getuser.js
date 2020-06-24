module.exports.run = async (client, message, args) => {
  if (message.author.id != "193044575500238849") return message.channel.createMessage("nuuu ty lawl :3");
  const db = require('betterqdb');
  let userData = new db.table('user');
  let id = args[0];
  console.log(userData.get(`u${id}`));
  
};
module.exports.config = {
  name: "getuser",
  aliases: ["getuser"],
  description: "a"
};