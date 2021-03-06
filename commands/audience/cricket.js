const { Command } = require('discord.js-commando');
const path = require('path');

module.exports = class CricketCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cricket',
            aliases: ['silence', 'silent', 'crickets'],
            group: 'audience',
            memberName: 'cricket',
            description: 'Audience goes silent in the channel.',
            guildOnly: true,
            clientPermissions: ['SPEAK', 'CONNECT']
        });
    }

    async run(message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.say('You must join a channel first.');
        message.member.voice.channel.join().then(connection => connection.play(path.join(__dirname, 'sounds/crickets.mp3')));
        
    }
}