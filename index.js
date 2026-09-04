const axios = require("axios");
require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

const fs = require('fs');
const path = require('path');

//hack-daily updated
app.command("/lilshark-hack_daily", async ({ command, ack, respond }) => {
  await ack();

  const user = command.user_name;
  const extraText = command.text ? command.text.trim() : "";

  //if missing input
  if (!extraText) {
    await respond({
      response_type: "ephemeral",
      text: `Heyy @${user}! You didn't add any progress notes:) Try running:\n\`\`\`/lilshark-hack_daily Worked on (write what you've worked on here).\`\`\``
    });
    return;
  }

  //save progress to a local JSON
  const logEntry = {
    user: user,
    note: extraText,
    timestamp: new Date().toISOString()
  };

  const filePath = path.join(__dirname, 'daily_logs.json');
  let logs = [];

  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      logs = fileData ? JSON.parse(fileData) : [];
    }
    logs.push(logEntry);
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error("Error saving daily log:", error);
  }

  //confirmation message
  await respond({
    response_type: "ephemeral",
    text: `🦈 *Daily Hackathon Log Recorded!*\n*Developer:* @${user}\n> "${extraText}"\n\n_The little shark has logged your progress! Keep building!_ 🚀`
  });
});

// --- help ---
app.command("/lilshark-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `*Little Shark Bot 🦈 Available Commands:*
    
\`/lilshark-hack_daily [notes]\` - Log your progress for the day.
\`/lilshark-ocean\` - Dive deep into a random marine biology or biomimicry fact.
\`/lilshark-space\` - Find out about International Space Station in real time.`
  });
});

// --- OCEAN/BIOMIMICRY FACTS ---
app.command("/lilshark-ocean", async ({ ack, respond }) => {
  await ack();

  const oceanFacts = [
    "Sharks don't have bones! Their skeletons are made entirely of cartilage—the same flexible material in our ears and noses. 🦈",
    "Biomimicry in action: Sharkskin is covered in tiny, V-shaped scales called dermal denticles. This structure reduces drag and prevents algae growth, inspiring advanced hull coatings for ships and high-performance swimsuits! 🌊",
    "Jellyfish are incredible survivalists. Species like the Moon Jellyfish inspire soft-robotic designs for underwater exploration due to their highly energy-efficient propulsion mechanisms.",
    "The ocean absorbs roughly 25-30% of global carbon dioxide emissions annually. Marine ecosystems like seagrass meadows and mangrove forests capture carbon up to 40 times faster than terrestrial tropical rainforests!",
    "The Mantis Shrimp packs a punch with the speed of a .22 caliber bullet! Their unique dactyl clubs strike with such acceleration that they vaporize water, creating cavitation bubbles that release heat and light.",
    "Bioluminescent deep-sea organisms use chemical reactions involving luciferin to produce light in total darkness, inspiring bio-inspired lighting and medical imaging tools.",
    "Humpback whale fins feature bumpy edges called tubercles. These bumps reduce aerodynamic drag on airplane wings and improve turbine generator efficiency by 20%!",
    "Whale shark patterns are completely unique to each individual, just like human fingerprints. Computer vision algorithms originally built for tracking star constellations are now used to track wild whale sharks!" ];

  const randomFact = oceanFacts[Math.floor(Math.random() * oceanFacts.length)];

  await respond({
    text: `*Ocean & Biomimicry Insight:* \n> ${randomFact}`
  });
});

// --- Live API - I hope ---
app.command("/lilshark-space", async ({ ack, respond }) => {
  await ack();

  try {
    // Uses WhereTheISS API to track the station
    const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
    const { latitude, longitude, altitude, velocity } = response.data;

    const latFixed = latitude.toFixed(2);
    const lonFixed = longitude.toFixed(2);
    const altFixed = Math.round(altitude);
    const velFixed = Math.round(velocity);

    await respond({
      text: `🚀 *ISS Aerospace Live Feed:* \n*Location:* ${latFixed}° Lat, ${lonFixed}° Long \n*Altitude:* ${altFixed} km above Earth \n*Velocity:* ${velFixed} km/h`
    });
  } catch (err) {
    await respond({ text: "🚀 The little shark lost telemetry with the space station. Try again in a bit!" });
  }
});

//start it
(async () => {
  try {
    await app.start();
    console.log("🦈 LilShark bot is active and listening via Socket Mode!");
  } catch (error) {
    console.error("Failed to start LilShark bot:", error);
  }
})();
