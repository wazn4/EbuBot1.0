const { MessageEmbed } = require('discord.js');

module.exports = {

        name: 'genel',
        description: 'Moderasyon komutlarını gösterir',

    async run(client, message, args) {
        const embed = new MessageEmbed()
            .setTitle(' 🟦 Genel Komutlar ')
            .setColor('#5865F2')
            .addFields(
                { name: 'ebu!avatar ', value: 'vay pp mi çalcan loo neyse gel çalak :D' },
                { name: 'ebu!ping', value: 'Botun Pingini Ölçebilirsinz :)' },
                { name: 'ebu!havadurumu Malatya', value: 'Şehrinizin havadurumunu gösterir' },
                { name: 'ebu!sunucubilgi', value: 'Sunucu hakkında bilgileri öğrenebilirsiniz :)' },
                { name: 'ebu!botbilgi', value: 'Bot hakkında bilgi alabilirsiniz' },
                { name: 'ebu!notum', value: 'Notunuza bakabilirsiniz' },
                { name: 'ebu!notal not', value: 'Not alabilirsiniz' }


            );
        await message.reply({ embeds: [embed] });
    },
};
