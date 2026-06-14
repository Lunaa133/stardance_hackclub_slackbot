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

// --- UPDATED HELP MENU ---
app.command("/lilshark-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `*Little Shark Bot 🦈 Available Commands:*
    
\`/lilshark-hack_daily [notes]\` - Log your progress for the day.
\`/lilshark-ocean\` - Dive deep into a random marine biology or biomimicry fact.
\`/lilshark-space\` - Fetch the current crew size of the International Space Station live.`
  });
});

// --- OCEAN/BIOMIMICRY FACTS ---
app.command("/lilshark-ocean", async ({ ack, respond }) => {
  await ack();

  const oceanFacts = [
    "Sharks don't have bones! Their skeletons are made entirely of cartilage—the same flexible material in our ears and noses. 🦈",
    "Biomimicry in action: Sharkskin is covered in tiny, V-shaped scales called dermal denticles. This structure reduces drag and prevents algae growth, inspiring advanced hull coatings for ships and high-performance swimsuits! 🌊",
    "Jellyfish are incredible survivalists. Species like the Moon Jellyfish inspire soft-robotic designs for underwater exploration due to their highly energy-efficient propulsion mechanisms.",
    "The ocean absorbs roughly 25-30% of global carbon dioxide emissions annually. Marine ecosystems like seagrass meadows and mangrove forests capture carbon up to 40 times faster than terrestrial tropical rainforests!"
  ];

  // Pick a random marine fact from the local array
  const randomFact = oceanFacts[Math.floor(Math.random() * oceanFacts.length)];

  await respond({
    text: `*Ocean & Biomimicry Insight:* \n> ${randomFact}`
  });
});

// --- LIVE AEROSPACE API ---
app.command("/lilshark-space", async ({ ack, respond }) => {
  await ack();

  try {
    // OpenNotify API tracks humans in space live
    const response = await axios.get("http://api.opennotify.org/astros.json");
    const crewCount = response.data.number;
    const crewNames = response.data.people.map(p => `${p.name} (${p.craft})`).join(", ");

    await respond({
      text: `🚀 *Aerospace Live Feed:* \nThere are currently *${crewCount} humans* orbiting Earth right now!\n\n*Current Crew:* _${crewNames}_`
    });
  } catch (err) {
    await respond({ text: "🚀 The little shark lost telemetry with the space station. Try again in a bit!" });
  }
});

// --- START APP ---
(async () => {
  await app.start();
  console.log("bot is running with custom commands!");
})();