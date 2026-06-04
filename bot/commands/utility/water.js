// deprecated twin

// const { SlashCommandBuilder } = require('discord.js');

// module.exports = {
// 	data: new SlashCommandBuilder()
//     .setName('water')
//     .setDescription('Track your water!')
//     .addSubcommand(sub =>
//       sub.setName('start')
//         .setDescription("start tracking your water")
//     )
//     .addSubcommand(sub =>
//       sub.setName('stop')
//         .setDescription("stop tracking your water")
//     ),

// 	async execute(interaction, { client }) {
// 		const userId = interaction.user.id;
//     const sub = interaction.options.getSubcommand();

//     waterTracker = client.waterTracker

//     console.log(waterTracker)

//     if(sub == 'start'){
//       waterTracker.set(userId, {
//         lastDrank: Date.now(),
//         active: true,
//       });

//       return interaction.reply({
//         content: "water tracking started ! :D"
//       })
//     }

//     if(sub == 'stop') {
//       waterTracker.delete(userId)

//       return interaction.reply({
//         content: "water tracking stopped ig"
//       })
//     }
// 	},
// };