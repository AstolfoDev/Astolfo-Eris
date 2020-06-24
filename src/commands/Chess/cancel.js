module.exports.run = async (client, message, args) => {
  
  const db = require("betterqdb");
  const userData = new db.table("user");
  const chessData = new db.table("chess");
  let inGame = userData.has(`u${message.author.id}.chess.playing`);

  if (!inGame) return message.channel.createMessage("u do not have any outgoing challenges");
  
  let inGameInfo = userData.get(`u${message.author.id}.chess.playing`);
  const match = chessData.get(`match-${inGameInfo.id}`);
  
  if (inGame) {
    if (inGameInfo.state == "challenged") {
      message.channel.createMessage("if u want to decline the incoming challenge then pls type:\n`/decline`");
    }
    else if (inGameInfo.state == "challenging") {
      let playerTwoID = match.p2.id;
      let playerTwo = client.users.get(playerTwoID);
      //console.log(match[inGameInfo.id])
      message.channel.createMessage(`ur challenge to ${playerTwo.mention} has been cancelled!`);
      chessData.delete(`match-${inGameInfo.id}`);
      userData.delete(`u${message.author.id}.chess.playing`);
      userData.delete(`u${playerTwoID}.chess.playing`);
    }
    else {
      message.channel.createMessage("ur mid-game! resign to leave the match");
    }
  };
        
};
module.exports.config = {
  name: "cancel",
  aliases: ["cancel"],
  description: "Cancel your chess challenge!",
};