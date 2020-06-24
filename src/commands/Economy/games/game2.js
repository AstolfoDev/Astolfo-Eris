module.exports.run = async (client, message, args) => {
  
  let db = require("betterqdb");
  let userData = new db.table("user");
  let check = async (success) => {
    if (success == "time") return
    if (success == false) return message.channel.createMessage(`u failed! so u did not earn any money`); 
    await work();
  };
  let work = async () => {
    var jobs = ["minecraft villager", "minecraft map maker", "minecraft youtuber", "minecraft streamer", "minecraft speedrunner", "minecraft server owner", "minecraft server admin", "minecraft server mod", "minecraft pixel artist", "minecraft redstone engineer", "minecraft architect", "minecraft pvper", "minecraft tutorial youtuber",
    "minecraft spleef world champion", "timelord from the planet Gallifrey"];
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
  
  let game2 = new Promise( async (resolve, reject) => {
  var filter = m => m.author.id === message.author.id;
  var words = ["guardian","ghast","emerald","diamond sword", "diamond", "creeper", "blaze"];
  var emojis = ["<:astolfoGuardian:703305017637077143>","<:astolfoGhast:703305011920109610>","<:astolfoEmerald:703305007939715093>","<:astolfoDiamondSword:703305007264694394>","<:astolfoDiamond:703305007713484871>","<:astolfoCreeper:703305009571561472>","<:astolfoBlaze:703305014654795828>"];
  var i = [Math.floor(Math.random()*words.length)];
  var emote = { word: words[i], emoji: emojis[i] };
  words.splice(i, 1);
  emojis.splice(i, 1);
  i = [Math.floor(Math.random()*words.length)];
  var emote1 = { word: words[i], emoji: emojis[i] };
  words.splice(i, 1);
  emojis.splice(i, 1);
  i = Math.floor(Math.random()*words.length);
  var finalWord = words[i];
  words.splice(i, 1);
  emojis.splice(i, 1);
  i = Math.floor(Math.random()*words.length);
  var finalEmoji = emojis[i];
  var emote2 = { word: finalWord, emoji: finalEmoji };
  var success = true;
  var list = [emote, emote1, emote2];
  var indexList = [0,1,2];
  
  var list1 = [];
  
  var j;
  
  function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
    
  }
  var list1 = shuffle(list);
  
  var word = finalWord;
  var answer;
      message.channel.createMessage(`<:astolfoHappy:683035783963082797> **heyyyYyyyy!** which word has the wrong emoji next to it?\n${list1[0].emoji} ${list1[0].word}\n${list1[1].emoji} ${list1[1].word}\n${list1[2].emoji} ${list1[2].word}\n🕐 You have **15 seconds!**`).then(async msg => {
      answer = await message.channel.awaitMessages(filter, { time: 15000, maxMatches: 1 });
      if (!answer[0]) {
        msg.edit(`<:astolfoFrown:683035895930421252> **out of time!** da word wazzzz \`${word}\`!!`);
        return;
      }
      if (answer[0].content.toLowerCase() != word) {
        msg.edit(`<:astolfoBlush:683035864842109118> **nuuuuuu~** the word was \`${word}\`!!!`);
        success = false
        return
      }
      await check(success);
      return
      })
  })
};