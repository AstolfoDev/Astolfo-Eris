module.exports.run = async (client, message, args) => {
  const EmbedPaginator = require('eris-pagination');
  const myEmbeds = [
            {
              title: `**Astolfo Help Menu**`,
              color: 0xde1073,
              author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL
              },
              footer: {
                text: "Astolfo.js",
                icon_url: client.user.avatarURL
              },
              description: "This screen will show you all the available commands on Astolfo.\nUse the reactions to flip through pages.\nTech support available @ https://discord.gg/4mFeX7V",          fields: [
                {
                  name: "1. Pizzaria Commands <:freddy:712450356868677644>",
                  value: "Hello... uh, hello hello?",
                  inline: true
                },
                {
                  name: `2. Chess Commands <:astolfoTea:683035717252808726>`,
                  value: "All the commands needed to play chess against your friends!",
                  inline: true
                },
                {
                  name: `3. User Commands <:astolfoWink:683036164458151937>`,
                  value: "View and modify your user details!",
                  inline: true
                },
                {
                  name: `4. Economy Commands <:astolfoBlush:683035864842109118>`,
                  value: "Manage and spend your virtual currency!",
                  inline: true
                },
                {
                  name: `5. Gambling Commands <:astolfoSugoi:683036088880857106>`,
                  value: "Make your money disappear!",
                  inline: true
                },
              ],
              thumbnail: {
                url: client.user.avatarURL
              }
            },
            {
              title: "**Astolfo Help Menu**",
              color: 0xde1073,
              thumbnail: { url: "https://media1.tenor.com/images/0f1b8fa79077c99fa3dea6a5d844d182/tenor.gif" },
              author: { icon_url: message.author.avatarURL, name: message.author.tag },
              footer: { text: "Astolfo.js", icon_url: client.user.avatarURL },
              description: "**Pizzaria commands!**",
              fields: [
              {
                name: "**/view**",
                value: "View your pizzaria!",
                inline: true
              },
              {
                name: "**/shift**",
                value: "Work the day shift!",
                inline: true
              },
              {
                name: "**/upgradepizzaria**",
                value: "Upgrade your pizzaria!",
                inline: true
              }
              ]
            },
            {
              title: "**Astolfo Help Menu**",
              color: 0xde1073,
              thumbnail: { url: "https://endlessfacts.com/upload/img/AoIte14397103782.gif" },
              author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL
              },
              footer: {
                text: "Astolfo.js",
                icon_url: client.user.avatarURL
              },
              description: "**Chess commands!**",
              fields: [
                {
                  name: "**/challenge**",
                  value: "Challenge another user to a chess match.",
                  inline: true
                },
                {
                  name: "**/cancel**",
                  value: "Cancel your challenge.",
                  inline: true
                },
                {
                  name: "**/accept**",
                  value: "Accept an incoming challenge.",
                  inline: true
                },
                {
                  name: "**/decline**",
                  value: "Decline an incoming challenge.",
                  inline: true
                },
                {
                  name: "**/move**",
                  value: "Move a piece to a new position.",
                  inline: true
                },
                {
                  name: "**/moves**",
                  value: "View all available moves.",
                  inline: true
                },
                {
                  name: "**/resign**",
                  value: "Forfeit your current game.",
                  inline: true
                },
                {
                  name: "**/cprofile**",
                  value: "View your chess stats and rating.",
                  inline: true
                },
                {
                  name: "**/chesstop**",
                  value: "View the chess leaderboards."
                }
              ]
            },
            {
              title: "**Astolfo Help Menu**",
              color: 0xde1073,
              thumbnail: { url: "https://66.media.tumblr.com/017d30c40283a7c2a32ceb8f4d774bb8/tumblr_oy6z4kU8Hg1wr0kdqo1_500.gif" },
              author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL
              },
              footer: {
                text: "Astolfo.js",
                icon_url: client.user.avatarURL
              },
              description: "**User commands!**",
              fields: [
                {
                  name: "**/profile**",
                  value: "View user levelling, economy, etc. information.",
                  inline: true
                },
                {
                  name: "**/setbio**",
                  value: "Set your global profile bio",
                  inline: true
                },
              ]
            },
            {
              title: "**Astolfo Help Menu**",
              color: 0xde1073,
              thumbnail: { url: "https://www.sbs.com.au/popasia/sites/sbs.com.au.popasia/files/anime-money-gif.gif" },
              author: { name: message.author.tag, icon_url: message.author.avatarURL },
              footer: { text: "Astolfo.js", icon_url: client.user.avatarURL },
              description: "**Economy commands!**",
              fields: [
                {
                  name: "**/bal**",
                  value: "View your balance!",
                  inline: true
                },
                {
                  name: "**/work**",
                  value: "Complete a task for money!",
                  inline: true
                },
                {
                  name: "**/leaderboard**",
                  value: "View the leaderboards of each currency!",
                  inline: true
                },
                {
                  name: "**/pay**",
                  value: "Transfer money to another user!",
                  inline: true
                },
                {
                  name: "**/upbank**",
                  value: "Upgrade your bank account!",
                  inline: true
                },
                {
                  name: "**/deposit**",
                  value: "Deposit money to your bank account!",
                  inline: true
                },
                {
                  name: "**/withdraw**",
                  value: "Withdraw money from your bank account!",
                  inline: true
                },
                {
                  name: "**/rob**",
                  value: "Rob credits from another user!",
                  inline: true
                }
              ]
            },
            {
              title: "**Astolfo Help Menu**",
              color: 0xde1073,
              thumbnail: { url: "https://68.media.tumblr.com/257cb36e43d064d193813c53dd8447a4/tumblr_otjsf3Qnd21t0lt8go2_500.gif" },
              author: { name: message.author.tag, icon_url: message.author.avatarURL },
              footer: { text: "Astolfo.js", icon_url: client.user.avatarURL },
              description: "**Gambling commands!**",
              fields: [
                {
                  name: "**/coinflip**",
                  value: "Flip a coin and bet credits on the outcome! (x2 reward)",
                  inline: true
                },
                {
                  name: "**/roll**",
                  value: "Roll a dice and bet trap coins on the outcome (x6 reward)!",
                  inline: true
                }
              ]
            },
        ];
 
        const paginatedEmbed = await EmbedPaginator.createPaginationEmbed(
            message, 
            myEmbeds, 
            {
                showPageNumbers: false,
                extendedButtons: false,
                maxMatches: 50,
                timeout: 150000,
                backButton: '◀',
                forthButton: '▶',
                startPage: 1
            }
        );
};

module.exports.config = {
    name: "help",
    aliases: ["?", "commands", "cmds"],
    description: "Hmm... 🤔"
};