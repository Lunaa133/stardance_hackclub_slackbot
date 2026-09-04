# LilShark Slack Bot
A slack bot giving random marine facts and some other commands.
[try lilshark](https://hackclub.enterprise.slack.com/archives/C0BTZBJ31CM)


## what is lilshark exactly?

lilshark is a slackbot that gives some random marine biology facts and live telemetry from the International Space Station!

## how lilshark works:

lilshark is added to slack, you can try it with [this](https://hackclub.enterprise.slack.com/archives/C0BTZBJ31CM) channel if you want or try it on another chat <br>
you can go to slack and type "/lilshark" and the commands should show up

example usage/type in:<br>
  /lilshark-ocean


## setup - if you want to create a version of your own:


1: clone this repository:

git clone https://github.com/Lunaa133/stardance_hackclub_slackbot<br>
cd stardance_hackclub_slackbot
npm install

2: set environment variables:

create a .env file

inside that file, write:

SLACK_BOT_TOKEN=your_token

SLACK_APP_TOKEN=your_token

run the bot:

node index.js

## commands:

- /lilshark-ocean: gives random marine fact
- /lilshark-space: gives ISS telemetry live (location, altitude and velocity)
- /lilshark-help: shows you the commands available
- /lilshark-hack_daily: daily coding, kind of a reminder and also you can log something about your progress but it would return the same answer each time when you do write something

  ---
made by: [kingkev](https://stardance.hackclub.com/@kingkev) for hackclub stardance
  
