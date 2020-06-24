module.exports.run = async (client, message, args) => {
  if (message.author.id != "193044575500238849") return message.channel.createMessage("nuuu ty lawl :3");
  message.channel.createMessage({
    embed: {
      description: args[0]
    }
  })
  
};
module.exports.config = {
  name: "getmatch",
  aliases: ["getmatch"],
  description: "a"
};