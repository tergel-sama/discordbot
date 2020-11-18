module.exports = {
  name: "args-info",
  description: "Args!",
  execute(msg, args) {
    if (!args.length) {
      return msg.channel.send(`arg-aa өгөлдөө, ${msg.author}!`);
    }

    msg.channel.send(`Чиний гуйлтын чинь нэр: args-info\nArgs: ${args}`);
  },
};
