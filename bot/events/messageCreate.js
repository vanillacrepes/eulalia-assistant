const { Events } = require('discord.js');
const { logDrink } = require('../utils/water');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if(message.author.bot) return; // don't read bot messages

    userId = message.author.id
    content = message.content

    if(content != "water" && content != "drink") return;

    logDrink(userId);
    message.reply("okay! :D");
  },
};