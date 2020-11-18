const { execute } = require("./clear");
const puppeteer = require("puppeteer");
module.exports = {
  name: "flaviojs",
  description: "flaviojs posts",
  async execute(msg, args) {
    if (args[0] && isNaN(args[0])) return msg.reply("Тоо оруулаарай");
    if (args[0] && args[0] > 100)
      return msg.reply("Тийм олон мэдээлэл оруулахгүй");
    if (args[0] && args[0] < 1) return msg.reply("Тоглоод байна уу");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://flaviocopes.com/tags/js/", {
      waitUntil: "networkidle2",
    });
    const data = await page.$$eval(".post-stub-title", (anchor) => {
      return anchor.map((item) => {
        return { name: item.innerText, value: item.parentElement.href };
      });
    });
    await browser.close();
    const exampleEmbed = {
      color: "#00B2EE",
      title: "Flavio мэдээнүүд",
      fields: data.slice(0, args[0] ? args[0] : 5),
      timestamp: new Date(),
      footer: {
        text: `${args[0] ? args[0] : 5} Мэдээлэл`,
      },
    };

    msg.channel.send({ embed: exampleEmbed });
  },
};
