module.exports.run = async (client, message, args) => {
  const send = require("./Functions/send.js");
  let action = "kiss";
  let msg = "kissed";
  let user1 = message.author;
  let user2 = message.mentions[0];
  let query = "anime kiss"
  if (!user2) return message.channel.createMessage("pls @mention the user u wanzzZz to kiss!!!1!")
  return await send.run(client, message, args, action, msg, user1, user2, query);
};
module.exports.config = {
  name: "kiss",
  aliases: ["kiss"]
};