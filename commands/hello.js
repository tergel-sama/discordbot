const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "hello",
  description: "Hello!",
  execute(msg, args) {
    const replies = ["Сайн уу!", "Eey yo!", "Юу байна да!", "K."];
    const index = Math.floor(Math.random() * replies.length);
    const embed = new MessageEmbed()
      .setTitle(replies[index])
      .setColor(0xff0000)
      .setDescription("Өнөөдөр ямархуу байна да!");

    msg.channel.send(embed);
  },
};
