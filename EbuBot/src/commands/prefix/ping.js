const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Botun pingini gösterir',
    run(client,message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle('🏓 Pong!')
            .setDescription(`Gecikme süresi ${Date.now() - message.createdTimestamp}ms.`)
            .setColor('BLUE')
            .setFooter(`Komutu kullanan kişi: ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send({ embeds: [embed] });
    },
};
