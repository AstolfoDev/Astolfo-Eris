module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const userData = new db.table("user");
  const chessData = new db.table("chess");
  
  let inGame = userData.has(`u${message.author.id}.chess.playing`);
  let inGameInfo = userData.get(`u${message.author.id}.chess.playing`);
  
  let match = chessData.get(`match-${inGameInfo.id}`);
  
  if (inGameInfo.state != "challenged") {
    message.channel.createMessage("u do not have any incoming challenges");
    return;
  }
  let playerOne = match.p1;
  
  message.channel.createMessage(`ur match with \`${playerOne.username}\` has been cancelled`);
  userData.delete(`u${message.author.id}.chess.playing`);
  userData.delete(`u${playerOne.id}.chess.playing`);
  chessData.delete(`match-${inGameInfo.id}`);
};
module.exports.config = {
  name: "decline",
  aliases: ["deny"],
  description: "Decline an incoming challenge"
};