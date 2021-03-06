const { Command } = require('discord.js-commando');
const path = require('path');

module.exports = class ApplaudCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'applaud',
            aliases: ['clap'],
            group: 'audience',
            memberName: 'applaud',
            description: 'Audience applauds in the channel.',
            guildOnly: true,
            clientPermissions: ['SPEAK', 'CONNECT']
        });
    }

    async run(message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.say('You must join a channel first.');
        message.member.voice.channel.join().then(connection => connection.play(path.join(__dirname, 'sounds/applause.mp3')));
        
    }
}