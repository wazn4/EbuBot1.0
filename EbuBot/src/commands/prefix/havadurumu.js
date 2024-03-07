const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = {
  name: 'havadurumu',
  description: 'Belirtilen konumun hava durumunu gösterir.',
  aliases: ['hvdrumu', 'hdurumu'],
  cooldown: 7000 ,
  run(client, message, args) {
    const location = args.join(" ");
    if (!location) {
      message.channel.send({ content: 'Lütfen bir yer girin.' });
      return;
    }

    weather.find({ search: location, degreeType: 'C' }, function(err, result) {
      if (err) message.channel.send(err);
      if (result === undefined || result.length === 0) {
        message.channel.send({ embeds: [new MessageEmbed().setDescription('Belirtilen yer için hava durumu bilgisi bulunamadı.').setColor('RANDOM')] });
        return;
      }
      var current = result[0].current;
      var location = result[0].location;
      const embed = new MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`${current.observationpoint} için hava durumu`)
        .setThumbnail(current.imageUrl)
        .setColor('#5865F2')
        .addField('Zaman Dilimi', `UTC${location.timezone}`, true)
        .addField('Derece Türü', location.degreetype, true)
        .addField('Sıcaklık', `${current.temperature} Derece`, true)
        .addField('Hissedilen Sıcaklık', `${current.feelslike}`, true)
        .addField('Rüzgar', current.winddisplay, true)
        .addField('Nem', `${current.humidity}%`, true);
      message.channel.send({ embeds: [embed] });
    });
  }
};