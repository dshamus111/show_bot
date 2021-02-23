const { Command } = require('discord.js-commando');
const path = require('path');
const config = require('../../config.json');

module.exports = class ToggleLaughCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'togglelaugh',
            aliases: ['togglel'],
            group: 'utils',
            memberName: 'togglel',
            description: `Toggle if audience laughs after a user first talks. Currently set to ${config.audience_laugh}`,
        });
    }

    run(message) {
        config.audience_laugh = !config.audience_laugh;
        message.say(
            `Audience introduction has been set to ${config.audience_laugh}`
        );
    }
};
