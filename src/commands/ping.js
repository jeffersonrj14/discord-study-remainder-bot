const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with the bot\'s latency.');

async function execute(interaction) {
    await interaction.deferReply();
    const ping = Math.round(interaction.client.ws.ping);
    await interaction.editReply(`\`${ping}ms\``);
}

module.exports = {
    data,
    execute,
};