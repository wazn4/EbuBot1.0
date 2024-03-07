const { MessageEmbed } = require('discord.js');

module.exports = {

        name: 'eğlence',
        description: 'Moderasyon komutlarını gösterir',
        aliases: ['eglence'],

    async run(client, message, args) {
        const embed = new MessageEmbed()
            .setTitle('🟧 Eğlence')
            .setColor('#5865F2')
            .addFields(
                { name: 'ebu!espiri ', value: 'hayattan soğutur benden demesi' },
                { name: 'ebu!ye @user', value: 'hayattan soğursun benden demesi' },
                { name: 'ebu!dc @user', value: 'doğruluk cesaret oynarsınız' },
                { name: 'ebu!yazı-tura #seçenek @user', value: 'ÖR: ebu!yazı-tura Yazı gibi' },



            );
        await message.reply({ embeds: [embed] });
    },
};
