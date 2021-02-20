// require('dotenv').config();
const config = require('./config.json');
const path = require('path');
const { CommandoClient } = require('discord.js-commando');

const client = new CommandoClient({
    commandPrefix: config.prefix,
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
    client.user.setActivity('preparing.')
});

client.on('error', console.error);

client.on('voiceStateUpdate', (oldState, newState) => {

    if(!config.audience_intro) {
        return;
    }

    const old_channel = oldState.channelID;
    const new_channel = newState.channelID;
    const isBot = newState.member.user.bot;

    // User has joined the voice chat
    if (old_channel === null && new_channel !== null) {
        if (!isBot) {
            newState.channel.join()
                .then(conncection => {
                    setTimeout(() => conncection.play(path.join(__dirname, 'commands/audience/sounds/applause.mp3')), 250);
                });
        }
    }
})

client.login(config.token);
