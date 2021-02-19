const { Command } = require('discord.js-commando');
const path = require('path');

module.exports = class LaughCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            aliases: ['evac', 'evacuate'],
            group: 'utils',
            memberName: 'leave',
            description: 'Audience leaves the channel.',
        });
    }

    run(message) {
        message.member.voice.channel.leave();
    }
}