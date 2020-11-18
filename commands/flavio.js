const puppeteer = require("puppeteer");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "flavio",
  description: "Flavio!",
  execute: async function execute(msg, args) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://flaviocopes.com/");

    const [el] = await page.$x(
      '//*[@id="container"]/div[1]/article/ol/li[1]/a/h4'
    );
    const txt = await el.getProperty("textContent");
    const rawText = await txt.jsonValue();

    const [el2] = await page.$x(
      '//*[@id="container"]/div[1]/article/ol/li[1]/a/p'
    );
    const txt2 = await el2.getProperty("textContent");
    const rawText2 = await txt2.jsonValue();

    const [el3] = await page.$x(
      '//*[@id="container"]/div[1]/article/ol/li[1]/div/div/a'
    );
    const txt3 = await el3.getProperty("textContent");
    const rawText3 = await txt3.jsonValue();

    const [el4] = await page.$x(
      '//*[@id="container"]/div[1]/article/ol/li[1]/a'
    );
    const txt4 = await el4.getProperty("href");
    const rawText4 = await txt4.jsonValue();
    browser.close();
    const embed = new MessageEmbed()
      .setTitle(rawText)
      .setColor('#00B2EE')
      .setDescription(rawText2)
      .addFields({
        name: "Үзэх",
        value: `<${rawText4}>`,
      })
      .setFooter(`**${rawText3}**`);

    msg.channel.send(embed);
    
  },
};
