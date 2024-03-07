const { MessageEmbed } = require('discord.js');

module.exports = {

        name: 'sunucu',
        description: 'Moderasyon komutlarını gösterir',
        aliases: ['sun,','suncu','sunuci'],
    async run(client, message, args) {
        const embed = new MessageEmbed()
            .setTitle(' ⬜Sunucu Ayarları  daha eklenmedi bu komutlar !!')
            .setColor('#5865F2')
            .addFields(
                { name: 'ebu!otorol ', value: 'otorol açar' },
                { name: 'ebu!otorolkapat', value: 'kapatır' },
                { name: 'ebu!sayaç', value: 'açar' },
                { name: 'ebu!sayaçkapat', value: 'kapatır' },

            );
        await message.reply({ embeds: [embed] });
    },
};
