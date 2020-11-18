const puppeteer = require("puppeteer");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "devto",
  description: "Devto!",
  execute: async function execute(msg, args) {
    if (args[0] && isNaN(args[0])) return msg.reply("Тоо оруулаарай");
    if (args[0] && args[0] > 20)
      return msg.reply("Тийм олон мэдээлэл оруулахгүй");
    if (args[0] && args[0] < 1) return msg.reply("Тоглоод байна уу");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://dev.to/enter");
    await page.type("#user_email", "oyuerdenetergel460@gmail.com");
    await page.type("#user_password", "crazyboy123");
    await page.click("#new_user > div.actions.pt-3 > input");
    await page.goto("https://dev.to/", { waitUntil: "networkidle2" });
    const data = await page.$$eval(".crayons-story__title", (anchors) => {
      return anchors.map((item) => {
        return { name: item.innerText, value: item.children[0].href };
      });
    });
    // console.log(data);
    // await page.waitForSelector(".crayons-story__title", {
    //   visible: true,
    // });

    // const data = await page.evaluate(() => {
    //   const titles = document.querySelectorAll(".crayons-story__title");
    //   return Array.from(titles)
    //     .map((item) => {
    //       return { name: item.innerText, value: item.children[0].href };
    //     })
    //     .slice(0, 10);
    // });
    browser.close();
    const exampleEmbed = {
      color: 0x0099ff,
      title: "Dev.to мэдээнүүд",
      fields: data.slice(0, args[0] ? args[0] : 10),
      timestamp: new Date(),
      footer: {
        text: `${args[0] ? args[0] : 10} Мэдээлэл`,
      },
    };

    msg.channel.send({ embed: exampleEmbed });
    // const embed = new MessageEmbed()
    //   .setTitle("Мэдээнүүд!")
    //   .setColor("#00B2EE")
    //   .setDescription("dev.to")
    //   .addFields(data)
    //   .setFooter(`asdasd`);

    // msg.channel.send(embed);
  },
};
