// require('dotenv').config();
const config = require('./config.json');
const path = require('path');
const { CommandoClient } = require('discord.js-commando');

const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: '141354842273742848',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        'audience',
        'audience commands',
        'themes',
        'theme commands',
        'utils',
        'utility commands',
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('preparing.');
});

client.on('error', console.error);

client.on('voiceStateUpdate', (oldState, newState) => {
    const old_channel = oldState.channelID;
    const new_channel = newState.channelID;
    const isBot = newState.member.user.bot;

    // User has joined the voice chat
    if (old_channel === null && new_channel !== null) {
        if (!isBot) {
            const member_id = newState.member.id;
            newState.channel.join().then((connection) => {
                if (config.audience_intro) {
                    setTimeout(
                        () =>
                            connection.play(
                                path.join(
                                    __dirname,
                                    'commands/audience/sounds/applause.mp3'
                                )
                            ),
                        250
                    );
                }
                if (config.audience_laugh) {
                    let join_speak = false;
                    const listener = (user, speaking) => {
                        const same_user = member_id === user.id;
                        if (
                            same_user &&
                            speaking.bitfield === 1 &&
                            join_speak === false
                        ) {
                            join_speak = true;
                            console.log('switching speaking');
                        }
                        if (
                            same_user &&
                            speaking.bitfield === 0 &&
                            join_speak === true
                        ) {
                            connection.off('speaking', listener);
                            debounce(() => {
                                console.log('playing');
                                connection.play(
                                    path.join(
                                        __dirname,
                                        'commands/audience/sounds/laughter.mp3'
                                    ),
                                    { volume: 0.5 }
                                );
                            }, 2000).call();
                        }
                    };
                    connection.on('speaking', listener);
                }
            });
        }
    }
});

const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

client.login(config.token);
