const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const {  prefix } = require("./config.json");
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("/app/commands")
  .filter((file) => file.endsWith(".js"));
client.login(process.env.token);

client.on("ready", readyDiscord);

function readyDiscord() {
  console.log("connected");
}

for (const file of commandFiles) {
  const command = require(`/app/commands/${file}`);
  client.commands.set(command.name, command);
}

//added member!------------------------

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "үндсэн-өрөө"
  );
  if (!channel) return;
  channel.send(`Тавтай морил, ${member}`);
});

//commands!--------------------------

client.on("message", gotMessage);

function gotMessage(msg) {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    client.commands.get("ping").execute(msg, args);
  } else if (command === "avatar") {
    client.commands.get("avatar").execute(msg, args);
  } else if (command === "server") {
    client.commands.get("server").execute(msg, args);
  } else if (command === "hello") {
    client.commands.get("hello").execute(msg, args);
  } else if (command === "args-info") {
    client.commands.get("args-info").execute(msg, args);
  } else if (command === "flavio") {
    client.commands.get("flavio").execute(msg, args);
  } else if (command === "devto") {
    client.commands.get("devto").execute(msg, args);
  } else if (command === "devto") {
    client.commands.get("devto").execute(msg, args);
  } else if (command === "clear") {
    client.commands.get("clear").execute(msg, args);
  } else if (command === "duck") {
    client.commands.get("duck").execute(msg, args);
  } else if (command === "ikon") {
    client.commands.get("ikon").execute(msg, args);
  } else if (command === "flaviojs") {
    client.commands.get("flaviojs").execute(msg, args);
  }
}
