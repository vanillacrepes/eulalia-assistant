water_threshold = 60 * 15; // in seconds
message_spacing = 1000; // in milliseconds


const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Partials, Events, GatewayIntentBits, MessageFlags } = require('discord.js');

require('dotenv').config();
token = process.env.DISCORD_TOKEN

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel, // Crucial for DM support
    Partials.Message 
  ], 
});

client.commands = new Collection();

// AUTOMATIC SEARCHING FOR COMMAND FILES
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const waterTracker = new Map();
client.waterTracker = waterTracker;

setInterval(() => {
  const now = Date.now();

  for (const [userId, data] of waterTracker.entries()) {
    if(!data.active) continue;

    const diff = now - data.lastDrank;

    if (diff >= water_threshold * 1000) {
      const user = client.users.cache.get(userId);

      if (user) {
        user.send("drink water twin");

        console.log(data.lastDrank)
      }

      data.lastDrank += message_spacing; // add a second
      waterTracker.set(userId, data);
    }
  }
})

client.login(token); // Keep this at the end <3