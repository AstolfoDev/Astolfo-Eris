module.exports.run = async (client, message, args) => {
  if (message.author.id != "193044575500238849" && message.author.id != "261498586611712000" ) return message.channel.createMessage("nuuu ty lawl :3");
  const db = require('betterqdb');
  let userData = new db.table('user');
  userData.add(`u${message.author.id}.cr`, parseInt(args[0]));
};
module.exports.config = {
  name: "a",
  aliases: ["a"],
  description: "a"
};