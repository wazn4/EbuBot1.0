const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Botun pingini gösterir'),
    async run(client,interaction) {
        const embed = new Discord.MessageEmbed()
            .setTitle('🏓 Pong!')
            .setDescription(`Gecikme süresi ${Date.now() - interaction.createdTimestamp}ms.`)
            .setColor('BLUE')
            .setFooter(`Komutu kullanan kişi: ${interaction.user.tag}`, interaction.user.displayAvatarURL());
        await interaction.reply({ embeds: [embed] });
    },
};
