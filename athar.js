const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

client.on('message', async message => {
    if (message.content.startsWith('!hadith')) {
        const query = message.content.slice(7); // استخراج الاستعلام بعد '!hadith'
        

        try {
            const response = await axios.get(`http://localhost:5000/search/${encodeURIComponent(query)}`);
            const data = response.data;
            
            
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('نتائج البحث عن الأحاديث')
                .setDescription(`عدد النتائج: ${data.metadata.length}`)
                .setTimestamp();

            data.data.forEach(result => {
                embed.addField(result.hadith, `الراوي: ${result.rawi}\nالكتاب: ${result.book}\nرقم الحديث: ${result.numberOrPage}`);
            });

            message.channel.send(embed);
        } catch (error) {
            console.error('حدث خطأ:', error);
            message.channel.send('حدث خطأ أثناء استرجاع البيانات.');
        }
    }
});

client.login('MTIxMDk5NzQzNTYxNTE1ODMxMg.GyTpec.es0aQ5oPuWMSnAq2Uit-tPq6uK6KiLRdx0iixQ');
