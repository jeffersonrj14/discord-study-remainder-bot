
// async function execute(interaction) {
//     await interaction.deferReply();

//     const user = interaction.user.toString(); // Mention the user who used the command
//     interaction.followUp(`Study reminder started ${user}!`);

//     // Start the reminder interval
//     reminderInterval = setInterval(() => {
//         sendReminder(interaction);
//     }, 30 * 60 * 1000); // 30 minutes interval
// }

const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('start')
  .setDescription('Start studying and receive a reminder every 30 minutes.');

let reminderInterval;
let startTime;

function getCurrentTime() {
    return new Date().toLocaleTimeString();
}

function sendReminder(interaction) {
    const currentTime = getCurrentTime();
    interaction.followUp(`${currentTime}: 30 minutes have passed. Keep studying!`);
}

async function execute(interaction) {
    await interaction.deferReply();

    const user = interaction.user.toString(); // Mention the user who used the command
    interaction.followUp(`Study reminder started ${user}!`);

    startTime = Date.now();

    // Start the reminder interval
    reminderInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const hoursElapsed = elapsedTime / (1000 * 60 * 60);
        if (hoursElapsed >= 5) {
            clearInterval(reminderInterval);
            interaction.followUp("Congratulations on studying for 5 hours! Don't forget to have a good rest.");
        } else {
            sendReminder(interaction);
        }
    }, 30 * 60 * 1000); // 30 minutes interval
}

module.exports = {
    data,
    execute
};
