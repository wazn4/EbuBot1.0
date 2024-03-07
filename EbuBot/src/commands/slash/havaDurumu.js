const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('havadurumu')
        .setDescription('Belirtilen konumun hava durumunu gösterir.')
        .addStringOption(option => 
            option.setName('sehir')
                .setDescription('Hava durumu kontrol edilecek konum')
                .setRequired(true)),
    async run(client,interaction) {
        const location = interaction.options.getString('location');

        weather.find({ search: location, degreeType: 'C' }, function(err, result) {
            if (err) {
                console.error(err);
                return interaction.reply('Bir hata oluştu.');
            }
            if (result === undefined || result.length === 0) {
                return interaction.reply('Belirtilen yer için hava durumu bilgisi bulunamadı.');
            }
            var current = result[0].current;
            var location = result[0].location;
            const embed = new MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`${current.observationpoint} için hava durumu`)
                .setThumbnail(current.imageUrl)
                .setColor('BLUE')
                .addField('Zaman Dilimi', `UTC${location.timezone}`, true)
                .addField('Derece Türü', location.degreetype, true)
                .addField('Sıcaklık', `${current.temperature} Derece`, true)
                .addField('Hissedilen Sıcaklık', `${current.feelslike}`, true)
                .addField('Rüzgar', current.winddisplay, true)
                .addField('Nem', `${current.humidity}%`, true);
            interaction.reply({ embeds: [embed] });
        });
    },
};
