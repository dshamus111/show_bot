const { Command } = require('discord.js-commando');
const path = require('path');
const config = require('../../config.json');

module.exports = class ToggleIntroCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'toggleintro',
            aliases: ['togglei'],
            group: 'utils',
            memberName: 'togglei&helpntro',
            description: `Toggle if audience applauds when user joins. Currently set to ${config.audience_intro}`,
        });
    }

    run(message) {
        config.audience_intro = !config.audience_intro;
        message.say(`Audience introduction has been set to ${config.audience_intro}`);
    }
}