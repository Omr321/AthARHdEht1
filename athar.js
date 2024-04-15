const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

client.on('message', async message => {
    if (message.content.startsWith('!hadith')) {
        const query = message.content.slice(7); // استخراج الاستعلام بعد '!hadith'
        await searchHadith(message, query);
    } else if (message.content.startsWith('!tafsir')) {
        const query = message.content.slice(8); // استخراج الاستعلام بعد '!tafsir'
        await searchTafsir(message, query);
    } else if (message.content.startsWith('!شرح')) {
        const query = message.content.slice(4); // استخراج الاستعلام بعد '!شرح'
        await searchExplanation(message, query);
    } else if (message.content.startsWith('!تفسير')) {
        const query = message.content.slice(6); // استخراج الاستعلام بعد '!تفسير'
        await searchTafsir(message, query);
    }
});

async function searchHadith(message, query) {
    // ... (كود البحث عن الحديث كما هو)
}

async function searchTafsir(message, query) {
    try {
        const response = await axios.get(`https://api.alquran.cloud/v1/quran/${query}/ar.alafasy`);
        const data = response.data.data;

        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`تفسير الآية ${query}`)
            .setDescription(data.text)
            .setTimestamp();

        message.channel.send(embed);
    } catch (error) {
        console.error('حدث خطأ:', error);
        message.channel.send('حدث خطأ أثناء استرجاع تفسير الآية.');
    }
}

async function searchExplanation(message, query) {
    try {
        const response = await axios.get(`https://dorar.net/dorar_api.json?skey=${encodeURIComponent(query)}`);
        const data = response.data;

        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('شرح الحديث')
            .setDescription(`الشرح: ${data[0].explanation}`)
            .setTimestamp();

        message.channel.send(embed);
    } catch (error) {
        console.error('حدث خطأ:', error);
        message.channel.send('حدث خطأ أثناء استرجاع شرح الحديث.');
    }
}

client.login('MTIxMDk5NzQzNTYxNTE1ODMxMg.GyTpec.es0aQ5oPuWMSnAq2Uit-tPq6uK6KiLRdx0iixQ');

