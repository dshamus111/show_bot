const { Command } = require('discord.js-commando');
const path = require('path');

module.exports = class BooCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'boo',
            group: 'responses',
            memberName: 'boo',
            description: 'Audience boos in the channel.',
            guildOnly: true,
            clientPermissions: ['SPEAK', 'CONNECT']
        });
    }

    async run(message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.say('You must join a channel first.');
        message.member.voice.channel.join().then(connection => connection.play(path.join(__dirname, 'sounds/boohiss.mp3')));
        
    }
}