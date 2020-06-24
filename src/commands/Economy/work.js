module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const userData = new db.table("user");
  const ReactionHandler = require("eris-reactions")
  //userData.delete(`u${message.author.id}.cooldowns`);
  const endTime = userData.get(`u${message.author.id}.cooldowns.work`)
  const coolTime = 60 * 1000;
  const now = Date.now();
  if (userData.has(`u${message.author.id}.cooldowns.work`)) {
    let expiration = endTime + coolTime;
    if (now > expiration) {
      userData.delete(`u${message.author.id}.cooldowns.work`);
      userData.set(`u${message.author.id}.cooldowns.work`, now);
    setTimeout(() => userData.delete(`u${message.author.id}.cooldowns.work`), coolTime);
      
    }
    if (now < expiration) {
      const timeLeft = (expiration - now) / 1000;
      if (timeLeft >= 60) {
        
        const mintime = timeLeft/60
        return message.channel.createMessage(`please wait another **${Math.ceil(mintime)}** minutes!`)
      }
      
      if (timeLeft >= 3600) {
        const hourtime = ((timeLeft/60)/60)
        return message.channel.createMesaage(`please wait another **${Math.ceil(hourtime)}** minutes!`)
      }
      else {
        return message.channel.createMessage(`please wait another **${Math.ceil(timeLeft)}** seconds!`);
      }
    }
  } else {
    userData.set(`u${message.author.id}.cooldowns.work`, now);
    setTimeout(() => userData.delete(`u${message.author.id}.cooldowns.work`), coolTime);
  }
  
  let work = async () => {
    var jobs = ["anime artist", "manga artist",
    "professional weeb", "osu! streamer", "osu! youtuber",
    "beatsaber streamer", "beatsaber youtuber", "lightnovel author",
    "anime plot writer", "twitch thot", "gacha game developer",
    "game developer", "AAA game developer", "indie game developer",
    "discord bot developer", "web developer",
    "ramen chef", "anime reviewer", "manga reviewer",
    "anime voice actor", "rule34 artist", "anime connoisseur", "manga connoisseur",
    "e-sports player", "timelord from the planet Gallifrey"];
    var index = [Math.floor(Math.random()*jobs.length)];
    var an = "a";
    var job = jobs[index];
    if (job[0].toLowerCase() == "a" || job[0] == "e" || job[0] == "i" || job[0] == "o" || job[0] == "u") an = "an";
    var multiplier = 500;
    var coronaBonus = args.join(" ").toLowerCase();
    var coronaText = "";
    if (coronaBonus == "from home") {
      multiplier = 1000;
      coronaText = "**[Corona Bonus]:** x2 moneeeeeeeeey 4 working @ hoOooOme!1!1!";
    }
    var salary = [Math.floor(Math.random()*multiplier)];
    
    message.channel.createMessage({
        embed: {
          title: "**Work Complete!**",
          color: 0xde1073,
          description: `You worked as ${an} \`${job}\` and earned ${salary} credits!\n${coronaText}`,
          thumbnail: {
            url: "https://media.tenor.com/images/fa4a5706dc9261ec7dd3277d47200c2d/tenor.gif"
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
    });
    userData.add(`u${message.author.id}.cr`, salary);
  };
  
  let megalovania = async () => {
    if (success == "time") return
    if (success == false) return message.channel.createMessage(`u failed! so u did not earn any money`); 
    work();
  };
  
  var games = 0
  const gameOne = require("./games/game1.js");
  games++
  const gameTwo = require("./games/game2.js");
  games++
  const gameThree = require("./games/game3.js");
  games++
  const gameFour = require("./games/game4.js");
  games++
  const gameFive = require("./games/game5.js");
  games++
  
  var random = [Math.floor(Math.random()*games)];
  
  if (random == 0) {
    gameOne.run(client, message, args);
  }
  else if (random == 1) {
    gameTwo.run(client, message, args);
  }
  else if (random == 2) {
    gameThree.run(client, message, args);
  }
  else if (random == 3) {
    gameFour.run(client, message, args);
  }
  else if (random == 4) {
    gameFive.run(client, message, args);
  }
  
};
module.exports.config = {
  name: "work",
  aliases: ["work"],
  description: "Do work. Get paid."
};