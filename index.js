const axios = require("axios");

require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/lilshark-hack_daily", async ({ command, ack, respond }) => {
  await ack();

  const user = command.user_name;
  const extraText = command.text;

  if (extraText) {
    await respond({ text: `Hey @${user}, you said: "${extraText}". The little shark is analyzing your text... 🦈` });
  } else {
    await respond({ text: `Hey @${user}! You didn't add any notes to your daily hack check-in. Try adding some text next time!` });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

app.command("/lilshark-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/lilshark-ping - Check bot latency
/lilshark-catfact - Get a cat fact`
  });
});

app.command("/lilshark-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/lilshark-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});