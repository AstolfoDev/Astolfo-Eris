module.exports.run = async (client, message, args) => {
  const db = require("betterqdb");
  let userData = new db.table("user");
  let newBio = args.join(" ");
  if (!newBio) return message.channel.createMessage({
    embed: {
      title: "**oOoOops!**",
      color: 0xde1073,
      author: {
        name: message.author.tag,
        icon_url: message.author.avatarURL
      },
      footer: {
        text: "Astolfo.js",
        icon_url: client.user.avatarURL
      },
      description: "OhhHhh no! u forgot 2 write what u wanted as your bio!!!!1!1!"
    }
  });
  
  if (newBio.length > 100) return message.channel.createMessage({
    embed: {
      title: "**oOoOops!**",
      color: 0xde1073,
      author: {
        name: message.author.tag,
        icon_url: message.author.avatarURL
      },
      footer: {
        text: "Astolfo.js",
        icon_url: client.user.avatarURL
      },
      description: "bios mustz be less than 100 characters!"
    }
  });
    
  if (userData.set(`u${message.author.id}.bio`, newBio)) return message.channel.createMessage({
    embed: {
      title: "**Bio updAaaaAaated!**",
      color: 0xde1073,
      author: {
        name: message.author.tag,
        icon_url: message.author.avatarURL
      },
      footer: {
        text: "Astolfo.js",
        icon_url: client.user.avatarURL
      },
      description: `yayyyyy!! ur bio was updated to "${newBio}".`
    }
  });
};
module.exports.config = {
  name: "setbio",
  aliases: ["bioset"],
  description: "Modify your profile description."
};