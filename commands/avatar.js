module.exports = {
  name: "avatar",
  description: "Avatar!",
  execute(msg, args) {
    if (!msg.mentions.users.size) {
      return msg.channel.send(
        `Чиний зураг, царайлаг юм аа: <${msg.author.displayAvatarURL({
          format: "png",
          dynamic: true,
        })}>`
      );
    }

    const avatarList = msg.mentions.users.map((user) => {
      return `${user.username}-ийн зураг: <${user.displayAvatarURL({
        format: "png",
        dynamic: true,
      })}>`;
    });

    // send the entire array of strings as a msg
    // by default, discord.js will `.join()` the array with `\n`
    msg.channel.send(avatarList);
  },
};
