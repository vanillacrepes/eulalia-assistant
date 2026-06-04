const { SlashCommandBuilder } = require('discord.js');
const { toggleActive } = require('../utils/water');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('water')
    .setDescription('toggle your water tracking!'),

	async execute(interaction, { client }) {
		const userId = interaction.user.id;

    const activeStatusJson = await toggleActive(userId);
    
    const message = activeStatusJson.active == 1 ? "Status set to active! Water is now being tracked, you will be pinged if you don't drink in an hour ^^.": "Status set to inactive! You will no longer be pinged. :("

    return interaction.reply({
        content: message
    })
  },
};