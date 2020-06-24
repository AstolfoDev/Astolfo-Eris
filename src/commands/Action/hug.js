module.exports.run = async (client, message, args) => {
  const send = require("./Functions/send.js");
  let action = "hug";
  let msg = "hugged";
  let user1 = message.author;
  let user2 = message.mentions[0];
  let query = "anime hug"
  if (!user2) return message.channel.createMessage("pls @mention the user u wanzzZz to hug!!!1!")
  return await send.run(client, message, args, action, msg, user1, user2, query);
};
module.exports.config = {
  name: "hug",
  aliases: ["hug","cuddle"]
};