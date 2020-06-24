module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  
  const userData = new db.table("user");
  const chessData = new db.table("chess");
  
  let inGame = userData.has(`u${message.author.id}.chess.playing`);
  let inGameInfo = userData.get(`u${message.author.id}.chess.playing`);
  
  var elo = 1500
  var wins = 0
  var losses = 0
  var total = 0
  //var available = "Available"
    var profileInfo = userData.get(`u${message.author.id}.chess`);
    console.log(profileInfo);
    if (!profileInfo.elo) {
      elo = 1500;
    }
    else if (profileInfo.elo) {
      elo = profileInfo.elo;
    }
    
    if (profileInfo.total) {
      total = profileInfo.total;
    }
    else if (!profileInfo.total) {
      total = 0;
    }
    
    if (!profileInfo.wins) {
      wins = 0;
    }
    else if (profileInfo.wins) {
      wins = profileInfo.wins;
    }
    
    if (!profileInfo.losses) {
      losses = 0;
    }
    else if (profileInfo.losses) {
      losses = profileInfo.losses
    }
           // if (profileInfo.playing.state) {
           //     available = "Unavailable"
          //  }
    message.channel.createMessage({
      embed: {
        title: `${message.author.username}'s Profile`,
        color: 0xDE1073,
        fields: [
          {
            name: "**Rating**",
            value: `${elo}`,
            inline: true
          },
          {
            name: "**Matches**",
            value: `${total}`,
            inline: true
          },
          {
            name: "**Wins**",
            value: `${wins}`,
            inline: true
          },
          {
            name: "**Draws**",
            value: `${total-wins-losses}`,
            inline: true
          },
          {
            name: "**Losses**",
            value: `${losses}`,
            inline: true
          }
        ],
        thumbnail: {
          url: message.author.avatarURL
        },
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL
        },
        footer: {
          text: "Astolfo.js",
          icon_url: client.user.avatarURL
        }
      }
    })
};

module.exports.config = {
  name: "cprofile",
  aliases: ["ci", "cp", "chessinfo"],
  description: "View your chess profile!"
}