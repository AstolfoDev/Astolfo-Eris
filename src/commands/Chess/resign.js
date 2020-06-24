module.exports.run = async (client, message, args) => {
  /////////////////////////////
  //::Imports & Definitions:://
  /////////////////////////////
  //
  const db = require("betterqdb")
  const userData = new db.table("user");
  const chessData = new db.table("chess");
  const ch = require("chess.js");
  //
  const fs = require("fs");
  const Canvas = require("canvas");
  const canvasbuffer = require("canvas-to-buffer");
  const path = require("path");
  let cig = require('chess-image-generator');
  let ChessImageGenerator = require("chess-image-generator");
  //
  let inGame = userData.has(`u${message.author.id}.chess.playing`);
  let inGameInfo = userData.get(`u${message.author.id}.chess.playing.id`);
  let match = chessData.get(`match-${inGameInfo}`);
  //
  ////////
  //
  
  if (!inGame) return message.channel.createMessage("ur not currently in a game!");
  
  const chess = new ch.Chess();
  chess.load(match.fen);
  var player1 = match.p1
  var player2 = match.p2
  
  var colour = chess.turn();
  if (message.author.id == player1.id) {
    var loser = "white";
    var loserID = message.author.id
    var winner = "black";
    var winnerID = player2;
  } else {
    var loser = "black";
    var loserID = message.author.id;
    var winner = "white";
    var winnerID = player1;
  }
  var winnerUser = winnerID.username;
  var loserUser = winnerID.username;
            
            
  userData.add(`u${winnerID.id}.chess.wins`, 1);
  userData.add(`u${winnerID.id}.chess.total`, 1);
  userData.add(`u${loserID.id}.chess.losses`, 1);
  userData.add(`u${loserID.id}.chess.total`, 1);
            
  userData.delete(`u${winnerID.id}.chess.playing`);
  userData.delete(`u${loserID.id}.chess.playing`);
  
  chessData.delete(`match-${inGameInfo.id}`);
            
  var EloRank = require('elo-rank');
  var elo = new EloRank(40);
            
  var playerA = 1500;
  var playerB = 1500;
  var old1 = 1500;
  var old2 = 1500;
            
  if (userData.has(`u${winnerID}.chess.elo`)) {
    playerA = userData.get(`u${winnerID}.chess.elo`);
    old1 = playerA;
  }
  if (userData.has(`u${loserID}.chess.elo`)) {
    playerB = userData.get(`u${loserID}.chess.elo`);
    old2 = playerB;
  }
             
  var expectedScoreA = elo.getExpected(playerA, playerB);
  var expectedScoreB = elo.getExpected(playerB, playerA);
             
  playerA = elo.updateRating(expectedScoreA, 1, playerA);
  playerB = elo.updateRating(expectedScoreB, 0, playerB);
  
  userData.set(`u${winnerID.id}.chess.elo`, parseInt(playerA));
  userData.set(`u${loserID.id}.chess.elo`, parseInt(playerB));
  
  message.channel.createMessage(`**${loser} resigned!**\n${winner} (${winnerUser}) wins!\n\n**New ratings:**\n${winnerUser} | ${old1} -> ${playerA}\n${loserUser} | ${old2} -> ${playerB}`);
};

module.exports.config = {
  name: "resign",
  aliases: ["resign"],
  description: "Resign from a chess match!"
}