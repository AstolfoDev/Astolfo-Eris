module.exports.run = async (client, message, args) => {
  /////////////////////////////
  //::Imports & Definitions:://
  /////////////////////////////
  //
  const db = require("betterqdb")
  const userData = new db.table("user");
  const chessData = new db.table("chess");
  const ch = require("chess.js");
  const chess = new ch.Chess();
  //
  const fs = require("fs");
  const Canvas = require("canvas");
  const canvasbuffer = require("canvas-to-buffer");
  const path = require("path");
  let cig = require('chess-image-generator');
  let ChessImageGenerator = require("chess-image-generator");
  //
  let inGameInfo = userData.get(`u${message.author.id}.chess.playing`);
  let match = chessData.get(`match-${inGameInfo.id}`);
  //
  /////////////////
  //::Main Code:://
  /////////////////
  let draw = async () => {
    if (inGameInfo.state != "player1" && inGameInfo.state != "player2") return message.channel.createMessage("ur not currently in a game!");
    
    chess.load(match.fen)
    var player1 = match.p1
    var player2 = match.p2
    var colour = chess.turn();
       
    if (message.author.id == player1.id) {
      var loser = "white";
      var loserID = message.author;
      var winner = "black";
      var winnerID = player2;
    }
    else {
      var loser = "black";
      var loserID = message.author;
      var winner = "white";
      var winnerID = player1;
    }
    var winnerUser = winnerID.username;
    var loserUser = winnerID.username;
            
    userData.push(`u${winnerID.id}.chess.history`, inGameInfo.id);
    userData.push(`u${loserID.id}.chess.history`, inGameInfo.id);
            
    userData.add(`u${winnerID.id}.chess.wins`, 0);
    userData.add(`u${winnerID.id}.chess.total`, 1);
    userData.add(`u${loserID.id}.chess.losses`, 0);
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
            
    if (userData.has(`u${winnerID.id}.chess.elo`)) {
      playerA = userData.get(`u${winnerID.id}.chess.elo`);
      old1 = playerA;
    }
    if (userData.has(`u${loserID.id}.chess.elo`)) {
      playerB = userData.get(`u${loserID.id}.chess.elo`);
      old2 = playerB;
    }
    
    var expectedScoreA = elo.getExpected(playerA, playerB);
    var expectedScoreB = elo.getExpected(playerB, playerA);
    
    playerA = elo.updateRating(expectedScoreA, 1, playerA);
    playerB = elo.updateRating(expectedScoreB, 0, playerB);
    
    message.channel.createMessage(`**Draw!**\nThe game has ended.`)
  }
  
  let runTests = async function() {
    try {
      let tests = [{description: "Options: None, Type: FEN", size: null, light: null, dark: null, array: null, pgn: null, fen: chess.fen()}];
      for (let i = 0; i < tests.length; i++) {
        let imageGenerator = await new ChessImageGenerator({
          size: 720,
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(222, 16, 115)',
          style: 'merida'
        });
        if (tests[i].fen != null) {
          await imageGenerator.loadFEN(tests[i].fen);
        } else if (tests[i].pgn != null) {
          await imageGenerator.loadPGN(tests[i].pgn);
        } else if (tests[i].array != null) {
          await imageGenerator.loadArray(tests[i].array);
        }
        const canvas = Canvas.createCanvas(500, 500);
        const ctx = canvas.getContext('2d');
        var number = Math.floor(Math.random()*5)
        
        var background = await Canvas.loadImage(`./chessbg.png`);
        
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = '#de1073';
        
        ctx.strokeRect(0, 0, canvas.width, canvas.height)
        
        let bruh1 = await imageGenerator.generateBuffer();
        
        const avatar = await Canvas.loadImage(bruh1);
        
        ctx.drawImage(avatar, 50, 50, 400, 400);
        
        message.channel.createMessage(`${colour} | ${chess.history()}`, {
          file: canvas.toBuffer(),
          name: "board.png"
        }).then(msg => {
          chessData.set(`match-${inGameInfo.id}.msgID`, msg.id);
          chessData.set(`match-${inGameInfo.id}.chID`, msg.channel.id);
        });
      }
    } catch(error) {
      console.log(error);
    }
  };
  
  chess.load(match.fen);
  var player1 = match.p1;
  var player2 = match.p2;
  var colour = chess.turn();
  
  if (chess.turn() == "b") {
    if (message.author.id != player2.id) {
      message.channel.createMessage("its not ur turn 2 move, its black's turn!!11!!")
      colour = "black"
      return;
    }
  } else if (chess.turn() == "w") {
    if (message.author.id != player1.id) {
      message.channel.createMessage("its currently white's turn to move!!1!1! ;P")
      colour = "white"
      return;
    }
  }
  
  let move1 = args[0];
  let move2 = args[1];
  let moves = args.join(" ");
  
  if (message.author.id == "193044575500238849") {
    if (move1 == "draw") {
      draw();
    }
  }
  if (!move2 && move1) {
    chess.move(`${move1}`, {sloppy: true});
  } else if (move2 && move1) {
    chess.move(`${move1}${move2}`, {sloppy: true});
  } else {
    message.channel.createMessage("pls specify a move!!1! :/");
    return;
  }
  
  message.delete();
  
  let msgID = chessData.get(`match-${inGameInfo.id}.msgID`);
  let chID = chessData.get(`match-${inGameInfo.id}.chID`);
  
  client.deleteMessage(chID, msgID);
  
  if (chess.in_check()) {
    message.channel.createMessage(`Check!`);
  }
  if (chess.in_draw()) {
    message.channel.createMessage("Draw!");
    if (chess.insufficient_material()) {
      message.channel.createMessage("Insufficient material, checkmate is not possible.");
      draw();
    }
    if (!chess.insufficient_material()) {
      message.channel.createMessage("50 move rule.");
      draw();
    }
  }
  if (chess.in_stalemate()) {
    message.channel.createMessage("Stalemate!");
    draw();
  }
  
  chessData.set(`match-${inGameInfo.id}.chess`, chess);
  chessData.set(`match-${inGameInfo.id}.fen`, chess.fen());
  chessData.set(`match-${inGameInfo.id}.moves`, chess.pgn());
  runTests();
  
  if (chess.in_checkmate()) {
    
    var loser1 = chess.turn();
    var loser;
    var loserID;
    var winner;
    var winnerID;
    if (loser1 == "b") {
      loser = "black";
      loserID = player2;
      winner = "white";
      winnerID = player1;
    } else if (loser1 == "w") {
      loser = "white";
      loserID = player1;
      winner = "black";
      winnerID = player2;
    }
    var winnerUser = client.users.get(winnerID.id);
    var loserUser = client.users.get(loserID.id);
    
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
    
    if (userData.has(`u${winnerID.id}.chess.elo`)) {
      playerA = userData.get(`u${winnerID.id}.chess.elo`);
      old1 = playerA;
    }
    if (userData.has(`u${loserID.id}.chess.elo`)) {
      playerB = userData.get(`u${loserID.id}.chess.elo`);
      old2 = playerB;
    }
    
    var expectedScoreA = elo.getExpected(playerA, playerB);
    var expectedScoreB = elo.getExpected(playerB, playerA);
    
    playerA = elo.updateRating(expectedScoreA, 1, playerA);
    playerB = elo.updateRating(expectedScoreB, 0, playerB);
    
    userData.set(`u${winnerID.id}.chess.elo`, playerA);
    userData.set(`u${loserID.id}.chess.elo`, playerB)
    
    userData.add(`u${winnerID.id}.tc`, 1);
    userData.add(`u${winnerID.id}.cr`, 1000);
    
    message.channel.createMessage(`**Checkmate!**\n${winner} (${winnerUser.mention}) wins and earned 1 trap coin and 1000 credits!\n\n**New ratings:**\n${winnerUser.mention} | ${old1} -> ${playerA}\n${loserUser.mention} | ${old2} -> ${playerB}`);
    return;
  };
  

};
module.exports.config = {
  name: "move",
  aliases: ["m"],
  description: "Move a piece on the board to a new position"
};