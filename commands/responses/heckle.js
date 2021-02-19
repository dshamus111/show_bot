const { Command } = require('discord.js-commando');
const fs = require('fs');
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

        const dir = path.join(__dirname, 'sounds/heckles');
        fs.readdir(dir, (err, files) => {
            const random_index = Math.floor(Math.random() * Math.floor(files.length));
            const heckle_file = files[random_index];
            message.member.voice.channel.join().then(connection => connection.play(path.join(__dirname, 'sounds/heckles/' + heckle_file)));
        }) 
    }
}