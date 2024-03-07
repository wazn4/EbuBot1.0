const { MessageEmbed } = require('discord.js');

module.exports = {

        name: 'moderasyon',
        description: 'Moderasyon komutlarını gösterir',
        aliases: ['mod', 'modresyon','modrsyon','modresyon'],

    async run(client, message, args) {
        const embed = new MessageEmbed()
            .setTitle(' 🟥 Moderasyon Komutları')
            .setColor('#5865F2')
            .addFields(
                { name: 'ebu!ban', value: 'Bir kullanıcıyı sunucudan yasaklar.' },
                { name: 'ebu!kick', value: 'Bir kullanıcıyı sunucudan atar.' },
                { name: 'ebu!mute', value: 'Bir kullanıcıyı susturur.' },
                { name: 'ebu!unmute', value: 'Bir kullanıcının susturmasını kaldırır.' } 
            );
        await message.reply({ embeds: [embed] });
    },
};
