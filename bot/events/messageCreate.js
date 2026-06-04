const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if(message.author.bot) return; // don't read bot messages

    author = message.author.id
    content = message.content

    if(content != "water") return;

    const user = waterTracker.get(author)
    user.lastDrank = Date.now();
    waterTracker.set(author, user);
  },
};