const pkg = require("../../package.json");

module.exports.run = async (client, message) => {
    const shard = message.channel.guild.shard;
    const ms = require("ms");
    return message.channel.createMessage({
        embed: {
            title: `**Astolfo v${pkg.version}**`,
            color: 0xDE1073,
            fields: [
                { 
                  name: "**Ping**",
                  value: `🖥️ Shard Latency \`${Math.round(shard.latency)}ms\`\n⏱️ Uptime \`${ms(client.uptime)}\`` 
                }
            ],
            footer: { text: "Astolfo" }
        }
    });
};

module.exports.config = {
    name: "stats",
    aliases: ["ping", "pong", "latency", "uptime", "version", "ver", "mem", "memory", "performance"],
    description: "Shows Astolfo client latency"
};