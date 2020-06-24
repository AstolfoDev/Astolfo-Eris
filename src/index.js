// Astolfo x Eris (v.0.10.0)
// Discord Bot built in Node.js

// Local config
const config = require("./config.json"); // Grabs data from config file
const keep_alive = require("./keep_alive.js"); // Starts a web server

// NPM stuff
const Eris = require("eris"); // Requires eris and other packages
require("eris-additions")(Eris);
const client = new Eris(config.token);

// Updates botlist server count
const servercount = require("./Integration/Mythical Bot List/servercount.js");

// Blacklist for my boi Epic#6666
let blacklist = ["397745647723216898"];
let reason = ["being a dipshit"];

client.connect(); // Connects to the Discord bot account

// Command Handler definitions
client.config = config;
client.commands = new Map();
client.aliases = new Map();
client.categories = new Map();

// More NPM stuff
const fs = require("fs"); // filesystem
const db = require("betterqdb"); // database package

// Database definitions
const userData = new db.table("user"); // grabs user data table
const guildData = new db.table("guild"); // grabs guild data table
const matchData = new db.table("match"); // grabs chess data table

// Local file
let setDefaults = require("./Features/New Message/checkdefault.js");

process.stdout.write("...")

// Command Handler
let i = 0;
let y = 0;
let readDir = fs.readdirSync("./commands/");
readDir.forEach(dirs => {
  let cmdFiles = fs.readdirSync(`./commands/${dirs}/`).filter(f => f.endsWith('.js'));
  i++;

  cmdFiles.forEach((file) => {
    const command = require(`./commands/${dirs}/${file}`);
    client.categories.set(command.config.name, dirs);
    client.commands.set(command.config.name, command);
    command.config.aliases.forEach(a => client.aliases.set(a, command.config.name));
  });
  process.stdout.write(`\rLoading commands... ${i}/${readDir.length}`);
});

// Client events
client
  .on("ready", () => {
    console.log(`\n${client.user.username} is now online!\nServers: ${client.guilds.size}`);
    client.editStatus("online", { name: "/help for da commandzZz!!", type: 3 });
    servercount.run(client);
    //0: playing
    //1: streaming (Twitch)
    //2: listening
    //3: watching
  })

  .on("messageCreate", async msg => {
    if (msg.content == "<@682220266901733381>" || msg.content == "<@!682220266901733381>") {
      msg.channel.createMessage(`hewwwwo ${msg.author.mention}, mai prefiXxXxx iz \`${config.prefix}\`\nfor da list of cOwOmmands do \`${config.prefix}help\``)
    }
    if (msg.channel.id == "692367547227439135" && msg.author.id != "682220266901733381") {
      let kayOne = require("./Integration/Kay/kay.js");
      let args = msg.content.split(" ");
      kayOne.run(client, msg, args);
      return;
    }
  
    if (msg.author.bot) return;
    
    if (userData.has(`u${msg.author.id}.chess.playing`)) {
      let id = matchData.get(`u${msg.author.id}.chess.playing.id`);
      let state = matchData.get(`u${msg.author.id}.chess.playing.state`);
      if (!matchData.has(`match-${id}`) && state == "playing") {
        userData.delete(`u${msg.author.id}.chess.playing`);
        msg.channel.createMessage(`heyyy ${msg.author.mention} ur active chess game was cancelled`);
      };
    };
    
    if (msg.author.id == "674765751877500943" && (msg.content.toLowerCase().includes("n word") || msg.content.toLowerCase().includes("nigga"))) {
      let args = msg.content.split(" ");
      let cola = require("./Features/Nitro Boost/nword-cola.js");
      cola.run(client, msg, args);
    }
    
    setDefaults.run(msg);
    
    if (!guildData.has(`u${msg.channel.guild.id}.disableLevels`) && msg.channel.guild.id != "683758284599328788") {
      let levels = require("./Features/Levelling/levelling.js");
      let args = msg.content.split(" ");
      levels.run(client, msg, args);
    }
    
    if (msg.author.bot || !msg.content.startsWith(config.prefix)) return;
    
    if (msg.author.id == '677120814805549086') {
      for(let i = 0; i < 2; i++) {msg.channel.createMessage("Oki Doki Boomer");}
    };

    

    const args = msg.content.split(" ");
    const cmd = client.commands.get(args[0].toLowerCase().slice(config.prefix.length)) || client.commands.get(client.aliases.get(args[0].toLowerCase().slice(config.prefix.length)));
    if (!cmd) return;
    if (blacklist.includes(msg.author.id)) return msg.channel.createMessage(`sorry uwu! uve been blacklisted for ${reason[blacklist.indexOf(msg.author.id)]}~ <3`)
  

    try {
      if (cmd) return cmd.run(client, msg, args.slice(1));
    }
    catch (e) {
      return console.log(e);
    }
  })

  .on("guildCreate", async guild => {

  })
  
  .on("guildMemberAdd", async (guild, member) => {
    switch (guild.id) {
      case "665401515640487946":
        try {
          member.addRole('668282839078535207', 'New member joined!');
        } catch (err) {
          console.log(err);
        };
        break;
      
      case "683024058799226903":
        if (member.id == "677120814805549086"){
          member.ban(0, "Sorry this discord has kids in it we don't allow pedos");
          break;
        };
        try {
          member.addRole('683378549972795476', 'New member joined~ <3')
        } catch (err) {
          console.log(err);
        };
        break;
    };
  })
  
  .on("guildCreate", async (guild) => {
    servercount.run(client);
    console.log(await guild.getInvites());
    return;
  });

process.on("unhandledRejection", async (reason, promise) => {
    console.log(`A crash was prevented`, reason);
});