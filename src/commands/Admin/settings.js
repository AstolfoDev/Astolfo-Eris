module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  const guildData = new db.table("guild");
  let fail = async () => {
    message.channel.createMessage({
      embed: {
        title: "**hey heY hEEeEeYyY**",
        thumbnail: { url: client.user.avatarURL },
        author: { name: message.author.tag, icon_url: message.author.avatarURL },
        footer: { text: "Astolfo.js", icon_url: client.user.avatarURL },
        color: 0xde1073,
        description: `${errorMsg}\n\nSyntax: /config [view/set/remove/reset] <setting> (new value) (additional flags)`
      }
    });
  };
  let success = async () => {
    message.channel.createMessage({
      embed: {
        title: "**oooOooOoOoh!**",
        thumbnail: { url: client.user.avatarURL },
        author: { name: message.author.tag, icon_url: message.author.avatarURL },
        footer: { text: "Astolfo.js", icon_url: client.user.avatarURL },
        color: 0xde1073,
        description: `${result}`
      }
    });
  }
  
  var errorMsg;
  if (!message.member.hasPermission("manageGuild")) {
    errorMsg = `u dont haz da permissions for this command!!!1!!`;
    return fail();
  };
  
  var command = args[0];
  var setting = args[1];
  var settings = ["levelling"];
  
  if (!command && setting) {
    errorMsg = `u need to specify the action u want to make! (view, set, remove or reset)`;
    return fail();
  };
  
  if (!command && !setting) {
    errorMsg = `available settings:\n
**levelling**: <level> <roleID>\n*Give a user a role when they reach a level on your server.*`;
    return fail();
  }
  
  if (command != "view" && command != "set" && command != "remove" && command != "reset") {
    errorMsg = `"${command}" is not a valid action! u must pick either "view", "set", "remove" or "reset"!!!`;
    return fail();
  };
  
  if (!setting) {
    errorMsg = `u need to specify the setting you want to ${command}!!`
  };
  
  if (!settings.includes(setting)) {
    errorMsg = `"${setting}" is not a valid setting! do \`/settings\` to view all settings and their flags!`;
    return fail();
  };
  
  var settingInfo = guildData.get(`u${message.channel.guild.id}.${setting}`);
  
  var result;
  
  if (command == "view") {
    if (!settingInfo || !settingInfo.levels) {
      result = `**Setting:** ${setting}\n**Flags:** None set`;
      return success();
    }
    else {
      if (setting == "levelling") {
        var levels = settingInfo.levels;
        var levelInfo = [];
        var levelName;
        result = "";
        levels.sort(function(a, b){return b-a});
        for (let i=0;i<levels.length;i++) {
          levelName = guildData.get(`u${message.channel.guild.id}.levelling.level.${levels[i]}`);
          levelInfo[i] = { number: levels[i], id: levelName };
          result = `${result}Level ${levelInfo[i].number}:\n<@&${levelInfo[i].id}>\n\n`
        }
        return success();
      }
    }
  }
  
  if (command == "set") {
    if (setting == "levelling") {
      var levelSet = args[2];
      var roleSet = args[3];
      if (!levelSet) {
        errorMsg = `u must specify the level u want to set the role for!`;
        return fail();
      }
      else if (isNaN(parseInt(levelSet))) {
        errorMsg = `"${levelSet}" is not a valid number!`;
        return fail();
      }
      else if (parseInt(levelSet) > 100 || parseInt(levelSet) < 1) {
        errorMsg = `u may only apply roles to levels between 1 and 100, to exceed this join the \`/support\` server and contact "agent".`;
        return fail();
      };
      levelSet = Math.floor(parseInt(levelSet));
      if (!roleSet) {
        errorMsg = `u must give a role ID for me to use!`;
        return fail();
      }
      else if (isNaN(parseInt(roleSet))) {
        errorMsg = `role IDs must be numbers!`;
        return fail();
      };
      var roleGet = await message.guild.roles.get(roleSet);
      if (!roleGet) {
        errorMsg = `invalid role ID! no role with that ID exists on this server!`;
        return fail();
      }
      var guildInfo = guildData.get(`u${message.channel.guild.id}.levelling`);
      
      var levels = guildData.get(`u${message.channel.guild.id}.levelling.levels`);
      
      if (levels == null) {
        levels = ["bruh","bruh2"];
      }
      
      if (!guildInfo.levels) {
        guildInfo = { levels: ["bruh","bruh2"] };
      }
      
      if (!guildInfo.levels.includes(parseInt(levelSet))) {
        guildData.push(`u${message.channel.guild.id}.levelling.levels`, levelSet);
      }
      guildData.set(`u${message.channel.guild.id}.levelling.level.${levelSet}`, roleSet);
      result = `role for level ${levelSet} set to ${roleSet}`;
      return success();
    }
  }
  
  if (command == "remove") {
    if (setting == "levelling") {
      var levelSet = args[2];
      if (!levelSet) {
        errorMsg = `u must specify the level u want to remove the role for!`;
        return fail();
      }
      else if (isNaN(parseInt(levelSet))) {
        errorMsg = `"${levelSet}" is not a valid number!`;
        return fail();
      }
      else if (parseInt(Math.floor(levelSet)) > 100 || parseInt(levelSet) < 1) {
        errorMsg = `u may only delete roles that have levels between 1 and 100, to exceed this join the \`/support\` server and contact "agent".`;
        return fail();
      }
      
      levelSet = Math.floor(parseInt(levelSet))
      var bruh1 = guildData.get(`u${message.channel.guild.id}.levelling.level.${levelSet}`);
      
      if (!bruh1) {
        errorMsg = `there is no role set for level ${levelSet}!`;
        return fail();
      }
      var data = guildData.get(`u${message.channel.guild.id}.levelling`);
      
      var removeIndex = data.levels.indexOf(levelSet);
      var removeArray = data.levels;
      console.log(removeArray)
      
      console.log(removeIndex)
      
      removeArray = removeArray.filter(item => item !== levelSet)
      
      console.log(removeArray)
      guildData.delete(`u${message.channel.guild.id}.levelling.levels`);
      guildData.delete(`u${message.channel.guild.id}.levelling.level.${levelSet}`);
      
      for (element of removeArray) {
        guildData.push(`u${message.channel.guild.id}.levelling.levels`, element);
      };
      
      result = `removed the setting for level ${levelSet}`
      return success();
    }
  }

  
  
  
};
module.exports.config = {
  name: "settings",
  aliases: ["setting","config"],
  descriprion: "Server configuartion"
};