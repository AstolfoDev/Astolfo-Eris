module.exports.run = async (client, message, args) => {
  const ch = require("chess.js");
  const db = require("betterqdb");
  const chessData = new db.table("chess");
  const userData = new db.table("user");
  let inGame = userData.has(`u${message.author.id}.chess.playing`);
  
  if (!inGame) {
    message.channel.createMessage("ur not currently in an active game!");
    return;
  }
  
  let inGameInfo = userData.get(`u${message.author.id}.chess.playing`);
  let match = chessData.get(`match-${inGameInfo.id}`);
  let chess = new ch.Chess();
  chess.load(match.fen);
  var move1 = args[0];
  if (!move1) {
    message.channel.createMessage(`Available moves:\n${chess.moves()}`);
    return;
  }
  if (move1) {
    message.channel.createMessage(`Available moves for square "${move1}":\n${chess.moves({square: `${move1}`})}`);
    return;
  };
};
module.exports.config = {
  name: "moves",
  aliases: ["stuck"],
  description: "View all available moves for the current player"
};