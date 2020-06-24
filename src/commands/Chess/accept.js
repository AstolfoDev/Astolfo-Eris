module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  
  const userData = new db.table("user");
  const chessData = new db.table("chess");
  
  let inGame = userData.has(`u${message.author.id}.chess.playing`);
  let inGameInfo = userData.get(`u${message.author.id}.chess.playing`);
  
  const match = chessData.get(`match-${inGameInfo.id}`);
  
  const fs = require("fs");
  const Canvas = require("canvas");
  const canvasbuffer = require("canvas-to-buffer");
  const path = require("path");
  let cig = require('chess-image-generator');
  let ChessImageGenerator = require("chess-image-generator");
  
  const ch = require("chess.js");
  const chess = new ch.Chess();
  
  if (!inGame || inGameInfo.state != "challenged") return message.channel.createMessage("u have not been challenged by anyone");
  let playerOne = match.p1
  userData.set(`u${message.author.id}.chess.playing.state`, "player2");
  userData.set(`u${playerOne.id}.chess.playing.state`, "player1");
        
  let runTests = async function() {
    try {
      let tests = [{description: "Options: None, Type: FEN", size: null, light: null, dark: null, array: null, pgn: null, fen: chess.fen()}];
      for (let i = 0; i < tests.length; i++) {
        let imageGenerator = await new ChessImageGenerator({
          size: 1000,
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(222, 16, 115)',
          style: 'merida'
        });
        
        if (tests[i].fen != null) {
          await imageGenerator.loadFEN(tests[i].fen);
        }
        else if (tests[i].pgn != null) {
          await imageGenerator.loadPGN(tests[i].pgn);
        }
        else if (tests[i].array != null) {
          await imageGenerator.loadArray(tests[i].array);
        }
        const canvas = Canvas.createCanvas(500, 500);
        const ctx = canvas.getContext('2d');
        var number = Math.floor(Math.random()*5);
        var background = await Canvas.loadImage(`./chessbg.png`);
        
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#de1073';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
        let bruh1 = await imageGenerator.generateBuffer();
        const avatar = await Canvas.loadImage(bruh1);
  
        ctx.drawImage(avatar, 50, 50, 400, 400);
        
        message.channel.createMessage({}, [{
          file: canvas.toBuffer(),
          name: "board.png"
        }]).then(msg => {
          chessData.set(`match-${inGameInfo.id}.msgID`, msg.id);
          chessData.set(`match-${inGameInfo.id}.chID`, msg.channel.id);
        });
      }
    } catch(error) {
      console.log(error);
    }
  }
  runTests();
};

module.exports.config = {
  name: "accept",
  aliases: ["ca"],
  description: "Accept a chess challenge!"
};