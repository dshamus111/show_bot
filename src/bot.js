const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('discord.js');

const client = new Client();

let connection;
const sound_path = path.join(__dirname, '../sounds/');

client.on('ready', () => {
    console.log('Logged in as ' + `${client.user.username}`)
});

client.on('message', async message => {

    if (message.content.startsWith('&')) {
        if (message.member.voice.channel) {
            connection = await message.member.voice.channel.join();
        }
    }
    
    switch(message.content) {
        case '&applaud':
            connection.play(sound_path + 'applause.mp3');

            break;

        case '&boo':
            connection.play(sound_path + 'boohiss.mp3');
            break;

        case '&laugh':
            connection.play(sound_path + 'laughter.mp3');
            break;

        case '&leave':
            connection.disconnect();
            break;
    }
});



client.login(process.env.DISCORDJS_BOT_TOKEN);

