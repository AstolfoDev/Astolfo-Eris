module.exports.run = async (client, message, args) => {
  
  let db = require("betterqdb");
  let userData = new db.table("user");
  let check = async (success) => {
    if (success == "time") return
    if (success == false) return message.channel.createMessage(`u failed! so u did not earn any money`); 
    await work();
  };
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
  }
  
  let game1 = new Promise( async (resolve, reject) => {

      resolve("uhhh");
      var filter = m => m.author.id === message.author.id;
      var words = ["facebook","twitter","reddit","4chan","youtube","twitch","yandere","tsundere","anime","manga","discord","google","internet","coronavirus"];
      var i = [Math.floor(Math.random()*words.length)];
      var word = words[i];
      var scrambled = word.split('').sort(function(){return 0.5-Math.random()}).join('');

      while (scrambled == word) {
        scrambled = word.split('').sort(function(){return 0.5-Math.random()}).join('');
      }

      var answer;
      var success = true;
      
      message.channel.createMessage(`<:astolfoHappy:683035783963082797> **oooooooooh!** unscramble this word: \`${scrambled}\`\n🕐 You have **15 seconds!**`).then(
        
        
        async msg => {
        
        answer = await message.channel.awaitMessages(filter, { time: 15000, maxMatches: 1 });
        if (!answer[0]) {
          msg.edit(`<:astolfoFrown:683035895930421252> **out of time!** da word wazzzz \`${word}\`!!`);
          return;
        }

        if (answer[0].content.toLowerCase() != word) {

          msg.edit(`<:astolfoBlush:683035864842109118> **nuuuuuu~** the word was \`${word}\`!!!`);
          success = false;
        }
        await check(success);
        return

      })
  })
};