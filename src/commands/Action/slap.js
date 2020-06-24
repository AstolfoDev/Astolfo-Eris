module.exports.run = async (client, message, args) => {
  const send = require("./Functions/send.js");
  let action = "slap";
  let msg = "slapped";
  let user1 = message.author;
  let user2 = message.mentions[0];
  let query = "anime slap"
  if (!user2) return message.channel.createMessage("pls @mention the user u wanzzZz to slap!!!1!")
  return await send.run(client, message, args, action, msg, user1, user2, query);
};
module.exports.config = {
  name: "slap",
  aliases: ["slap"]
};