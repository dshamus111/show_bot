const { Command } = require('discord.js-commando');
const path = require('path');

module.exports = class ApplaudCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'heckle',
            group: 'responses',
            memberName: 'heckle',
            description: 'Audience heckles in the channel.',
            guildOnly: true,
            clientPermissions: ['SPEAK', 'CONNECT']
        });
    }

    async run(message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.say('You must join a channel first.');
        message.member.voice.channel.join().then(connection => connection.play(path.join(__dirname, 'sounds/heckles/heckle1.mp3')));
        
    }
}