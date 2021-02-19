const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('discord.js');

const client = new Client();

let connection;

client.on('ready', () => {
    console.log('Logged in as ' + `${client.user.username}`)
});

client.on('message', async message => {

    if (message.content.startsWith('&')) {
        if (message.member.voice.channel) {
            connection = await message.member.voice.channel.join();
        }
    
    
        switch(message.content) {
            case '&applaud':
                connection.play(path.join(__dirname, './sounds/applause.mp3'));

                break;

            case '&boo':
                connection.play(path.join(__dirname, './sounds/boohiss.mp3'));
                break;

            case '&laugh':
                connection.play(path.join(__dirname, './sounds/laughter.mp3'));
                break;

            case '&leave':
                connection.disconnect();
                break;
        }
    }
});



client.login(process.env.DISCORDJS_BOT_TOKEN);

