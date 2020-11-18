module.exports = {
  name: "server",
  description: "Server!",
  execute(msg, args) {
    msg.channel.send(
      `Сервер нэр: ${msg.guild.name}\nБаагийнуудын тоо: ${msg.guild.memberCount}`
    );
  },
};
