module.exports = {
  name: "clear",
  description: "Clear message",
  async execute(msg, args) {
    if (!args[0]) return msg.reply("Хэдэн мөр msg устгахаа оруулаарай");
    if (isNaN(args[0])) return msg.reply("Тоо оруулаарай");
    if (args[0] > 100) return msg.reply("Тийм олон устгахгүй ээ");
    if (args[0] < 1) return msg.reply("Тоглоод байна уу");
    await msg.channel.messages.fetch({ limit: args[0] }).then((msgs) => {
      msg.channel.bulkDelete(msgs);
    });
  },
};
