module.exports.run = async (client, message, args) => {
  
  const Chess = require("chess.js");
  const chess = new Chess.Chess();
  
  const db = require("betterqdb");
  
  const userData = new db.table("user");
  const chessData = new db.table("chess");
  chessData.set('match-0', 0)
  const match = chessData.all();
  
  let inGame = userData.has(`u${message.author.id}.chess.playing`);
  let inGameInfo = userData.get(`u${message.author.id}.chess.playing`);

  let user = message.mentions[0]
  if (user == undefined) return message.channel.createMessage("u need to @mention the user you want to challenge")
  let checkState = userData.has(`u${user.id}.chess.playing}`)
  if (inGame) return message.channel.createMessage("ur already in a game or u already challenged someone\ncancel a challenge with `/cancel` or resign your game with `/resign`")
  if (user.id == message.author.id) return message.channel.createMessage("u cant challenge urselfffffff smh!!!!")
  if (checkState) return message.channel.createMessage(`that player is currently unavailable!!!1!`)
        
  let player1 = message.author;
  chessData.set(`match-${match.length}`, { ID: match.length, p1: player1, p2: user, moves: chess.pgn(), fen: chess.fen(), active: false, winner: "None", chess: chess, turn: "white" })
  userData.set(`u${message.author.id}.chess.playing`, { state: "challenging", id: match.length })
  userData.set(`u${user.id}.chess.playing`, { state:"challenged", id: match.length })

  return message.channel.createMessage({
        embed: {
            title: `**__New Challenge!__**`,
            color: 0xDE1073,
            author: {
              name: message.author.tag,
              icon_url: message.author.avatarURL
            },
            fields: [
                { 
                  name: "**Challenger**",
                  value: `${message.author.mention}`
                },
                {
                  name: "**Opponent**",
                  value: `${user.mention}`
                }
            ],
            footer: { text: user.tag, icon_url: user.avatarURL }
        }
  });

};

module.exports.config = {
  name: "challenge",
  aliases: ["ch"],
  description: "Challenge an opponent to a match of chess!"
};