const Discord = require('discord.js');

module.exports = {
    name: 'mahmuddossantoselviero',
    description: 'Botun pingini gösterir',
    run(client,message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle('MERTİN GERÇEK YÜZÜ')
            .setURL(`https://grabify.link/3PEWY9`)
            .setColor('BLUE')
            .setFooter(`Komutu kullanan kişi: ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send({ embeds: [embed] });
    },
};
