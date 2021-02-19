const dotenv = require('dotenv').config();
const path = require('path');
const { CommandoClient } = require('discord.js-commando');
const { Client } = require('discord.js');

// const client = new Client();
const client = new CommandoClient({
    commandPrefix: '&',
    owner: '141354842273742848'
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        'audience', 'audience commands',
        'themes', 'theme commands',
        'utils', 'utility commands'
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`)
    client.user.setActivity('in their seats.')
});

client.on('error', console.error);

client.login(process.env.DISCORDJS_BOT_TOKEN);
