// TODO make sure to switch package.json start script before pushing IE: "start": "node rarecoinbot.js"
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const domain = "rare.claims";
const secure = "https";
const loadingMessage = "Retrieving... Please Wait";
const errorMessage = "Sorry, something went wrong. Try again latter";
const whatcanthisbotdo = `An interactive chatbot created to help you get started with The Rare Coin Cryptocurrency Native To xDai Chain | https://rare.fyi 
*Here are just SOME of the cool things I can get for you!*
⚡️/price - gets the price of Rare Coin 
⚡️/marketcap - gets the current market cap of Rare Coin
⚡️/circulatingSupply - gets the amount of circulatinf Rare Coin
📖 Get all the links you need to get started with Rare Coin 
📖 Get a list of the most asked questions! 
📖 Return a list of all my commands!`;

// auto responder
// bot.on("message", (msg) => {
//   // Kicks if says sware word example
//   // if (msg.text.includes("fucker")) {
//   //   bot.kickChatMember(msg.chat.id, msg.from.id);
//   // }
// });

// Default Greeting for new memebers TODO TEST!
bot.on("new_chat_members", (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Hi ${msg.from.first_name} Welcome to the Rare Coin community!`,
    {
      disable_web_page_preview: true,
      parse_mode: "HTML",
    }
  );
});

// I have A Question |  TODO build interactive, try to fetch response off users questions
bot.onText(/I have A Question/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `This is a list of all of our most <a href="https://rare.fyi/faqs/">frequently asked questions.</a>`,
    { parse_mode: "HTML" }
  );
  setTimeout(
    () =>
      bot.sendMessage(
        msg.chat.id,
        `If you didn't find your answer there then please ask in one of our support Groups @rarify_community | @rarifyc_espanol
        `,
        { parse_mode: "HTML" }
      ),
    4000
  );
  setTimeout(
    () =>
      bot.sendMessage(
        msg.chat.id,
        `If it's urgent you can ping our supports staff by typing @rjayerbe or @martxel_larralde in one of the groups and they will respond at their earliest convenience.   
    `,
        { parse_mode: "HTML" }
      ),
    8000
  );
});

// Get Link List | Returns list of common links to the user
bot.onText(/Get Links/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `<b>🚀🚀 Rarify Key Links & How To Get Started 🚀🚀

  Telegram Community Groups //</b>
  @rarify_news | @rarify_community | @rarifyc_espanol
  
  <b>Trusted Telegram Accounts //</b> <i>(Will Not DM First)</i>
  @rarify @paulysun @rjayerbe @martxel_larralde 
  
  <b>~~~~~~~🚀 APP LINKS 🚀~~~~~~~</b> 
  <b>Our Official Website:</b> https://rare.fyi/
  <b>Our Resource Page:</b> https://rare.fyi/articles/
  <b>Audit & FAQS:</b> https://rare.fyi/faqs/
  <b>Roadmap:</b> https://rare.fyi/roadmap
  <b>Where To Trade:</b> https://rare.fyi/trade
  <b>Buy App</b> 👉 https://rare.fyi/buy
  <b>Staking App</b> 👉 https://rare.fyi/stake
  <b>Claiming App</b> 👉 https://rare.fyi/claim-v2
  <b>RareLotto App</b> 👉 https://rare.fyi/lotto
  
  <b>TOKEN ADDRESS & IS ONLY ON XDAI  (RAREv2): </b> <a href="https://blockscout.com/xdai/mainnet/token/0x57e93BB58268dE818B42E3795c97BAD58aFCD3Fe/token-transfers">0x57e93BB58268dE818B42E3795c97BAD58aFCD3Fe</a>`,
    {
      disable_web_page_preview: true,
      parse_mode: "HTML",
    }
  );
});

// Get List Of Commands | Returns list of commands to user
bot.onText(/Get List Of Commands/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `<b>Here are just SOME of the cool things I can get for you!</b>

  ⚡️/tvl - Gets the amount of value locked in the staking protocol.
  ⚡️/price - gets the price of Rare Coin.
  ⚡️/volume - gets the amount of xDai traded in the last 24 hours.
  ⚡️/marketcap - gets the current market cap of Rare Coin.
  ⚡️/circulatingSupply - gets the amount of circulating Rare Coin.`,
    { parse_mode: "HTML" }
  );
});

/* COMMAND LIST ------------ */

// Simple Command that repeats what a user types in after "/echo" command
bot.onText(/\/echo (.+)/, (msg, match) => {
  bot.sendMessage(msg.chat.id, match[1]);
});

// /start
bot.onText(/\/start/, async (msg) => {
  try {
    bot.sendMessage(
      msg.chat.id,
      `"Hey! ${msg.from.first_name}, I'm Rarebot! 🤖" An interactive chatbot created to help you get information about Rare Coin!
      `
    );
    setTimeout(
      () =>
        bot.sendMessage(
          msg.chat.id,
          `For starters, <b>Rare Coin</b> is a Cryptocurrency Native To xDai Chain with a fixed supply of 36,500 coins. <i>(Not to be confused with, "SuperRare", "RarePepe" or "RareUniqueOne")</i>
      `,
          { parse_mode: "HTML" }
        ),
      3000
    );
    setTimeout(
      () =>
        bot.sendMessage(
          msg.chat.id,
          `Everyday, 2 of those coins are released and can be claimed through the https://rare.claims app by anyone untill 100% of the 36,500 coins are released! <i>(Should take about 50 years)</i>
      `,
          { parse_mode: "HTML" }
        ),
      8000
    );
    setTimeout(
      () =>
        bot.sendMessage(
          msg.chat.id,
          `You can visit our website at https://rare.fyi, anytime to get updated infomation about the project or perhaps I can help you get started with Rare Coin with one of thease options:
      `,
          {
            disable_web_page_preview: true,
          }
        ),
      16000
    );
    setTimeout(
      () =>
        bot.sendMessage(msg.chat.id, `👇`, {
          reply_markup: {
            keyboard: [
              ["I have A Question", "Get Links"],
              ["Get List Of Commands"],
            ],
          },
          disable_web_page_preview: true,
        }),
      20000
    );
  } catch (err) {
    console.log(err);
    bot.sendMessage(msg.chat.id, `${errorMessage}`);
  }
});

// /price
bot.onText(/\/price/, async (msg) => {
  try {
    bot.sendMessage(msg.chat.id, `${loadingMessage}`);
    const call = await axios.get(`${secure}://${domain}/api/rarecoin/price`);
    const data = JSON.parse(await call.data);
    bot.sendMessage(msg.chat.id, `$${data}`);
  } catch (err) {
    console.log(err);
    bot.sendMessage(msg.chat.id, `${errorMessage}`);
  }
});

// /Marketcap
bot.onText(/\/marketcap/, async (msg) => {
  try {
    bot.sendMessage(msg.chat.id, `${loadingMessage}`);
    const call = await axios.get(
      `${secure}://${domain}/api/rarecoin/market-cap`
    );
    const data = JSON.parse(await call.data);
    bot.sendMessage(msg.chat.id, `$${data}`);
  } catch (err) {
    console.log(err);
    bot.sendMessage(msg.chat.id, `${errorMessage}`);
  }
});

// /circulatingSupply
bot.onText(/\/circulatingsupply/, async (msg) => {
  try {
    bot.sendMessage(msg.chat.id, `${loadingMessage}`);
    const call = await axios.get(
      `${secure}://${domain}/api/rarecoin/circulating-supply`
    );
    const data = JSON.parse(await call.data);
    bot.sendMessage(msg.chat.id, `${parseInt(data)} RARE Circulating`);
  } catch (err) {
    console.log(err);
    bot.sendMessage(msg.chat.id, `${errorMessage}`);
  }
});

// /tvl
bot.onText(/\/tvl/, async (msg) => {
  try {
    bot.sendMessage(msg.chat.id, `${loadingMessage}`);
    const call = await axios.get(
      `${secure}://${domain}/api/rarecoin/staking/tvl`
    );
    const data = JSON.parse(await call.data);
    bot.sendMessage(
      msg.chat.id,
      `$${data} | Locked In The Rare Staker Protocol`
    );
  } catch (err) {
    console.log(err);
    bot.sendMessage(msg.chat.id, `${errorMessage}`);
  }
});

// /volume
bot.onText(/\/volume/, async (msg) => {
  try {
    bot.sendMessage(msg.chat.id, `${loadingMessage}`);
    const call = await axios.get(
      `${secure}://${domain}/api/rarecoin/24hour-volume
      `
    );
    const data = await call.data.dailyVolumeUSD;
    bot.sendMessage(msg.chat.id, `Daily Volume: ${parseInt(data)} xDai`);
  } catch (err) {
    console.log(err);
    bot.sendMessage(msg.chat.id, `${errorMessage}`);
  }
});
