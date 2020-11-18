const puppeteer = require("puppeteer");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "duck",
  description: "search duckduckgo",
  execute: async function execute(msg, args) {
    if (!args[0]) return msg.reply("Хайх утгаа бичээрэй");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://duckduckgo.com/", { waitUntil: "networkidle2" });
    await page.type("#search_form_input_homepage", args.join(" "));
    await page.click("#search_button_homepage");
    await page.waitForNavigation({
      waitUntil: "networkidle2",
    });
    const data = await page.$$eval(".result__a", (anchor) => {
      return anchor
        .map((item) => {
          return { name: item.innerText, value: item.href };
        })
        .slice(0, 5);
    });
    await browser.close();
    const exampleEmbed = {
      color: "#f5a339",
      title: "Duckduckgo хайлтын үр дүн",
      fields: data,
      timestamp: new Date(),
      footer: {
        text: "5 Мэдээлэл",
      },
    };

    msg.channel.send({ embed: exampleEmbed });
  },
};
