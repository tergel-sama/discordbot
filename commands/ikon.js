const { execute } = require("./clear");

const puppeteer = require("puppeteer");
module.exports = {
  name: "ikon",
  description: "ikon",
  async execute(msg, args) {
    if (args[0] && isNaN(args[0])) return msg.reply("Тоо оруулаарай");
    if (args[0] && args[0] > 20) return msg.reply("Тийм олон мэдээлэл оруулахгүй");
    if (args[0] && args[0] < 1) return msg.reply("Тоглоод байна уу");
    const browser = await puppeteer.launch({
  'args': [
    '--no-sandbox',
    '--disable-setuid-sandbox',
  ],
});
    const page = await browser.newPage();
    await page.goto("https://ikon.mn/", { waitUntil: "networkidle2" });
    const data = await page.$$eval(".nldesc>.nltitle>a", (anchor) => {
      return anchor.map((item) => {
        return { name: item.innerText, value: item.href };
      });
    });
    await browser.close();
    const exampleEmbed = {
      color: "#fd3e0a",
      title: "Ikon.mn мэдээнүүд",
      fields: data.slice(0, args[0] ? args[0] : 5),
      timestamp: new Date(),
      footer: {
        text: `${args[0] ? args[0] : 5} Мэдээлэл`,
      },
    };

    msg.channel.send({ embed: exampleEmbed });
  },
};
