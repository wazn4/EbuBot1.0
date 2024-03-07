const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const os = require('os');
const cpuStat = require('cpu-stat');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = {
  name: 'istatistik',
  run: async function (client, interaction) {
    const m = await interaction.reply('Biraz bekleyiniz, istatistikler alınıyor...');

    const osType = os.type();
    const osBit = os.arch();

    let cpuLol;
    cpuStat.usagePercent(function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
      const duration = moment.duration(client.uptime).format('D [gün], H [saat], m [dakika], s [saniye]');

      setTimeout(() => {
        const embed = new MessageEmbed()
          .setColor('#5865F2')
          .setFooter(client.user.username, client.user.avatarURL())
          .addField('» Botun Sahibi', '')
          .addField('» Gecikme süreleri', `Mesaj Gecikmesi: ${Date.now() - interaction.createdTimestamp} ms\nBot Gecikmesi: ${Math.round(client.ws.ping)} ms`, true)
          .addField('» Çalışma süresi', duration, true)
          .addField(
            '» Genel veriler',
            stripIndents`
            **Kullanıcı Sayısı:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
            **Sunucu Sayısı:** ${client.guilds.cache.size}
            **Kanal Sayısı:** ${client.channels.cache.size}
            `,
            true
          )
          .addField(
            '» Versiyonlar',
            stripIndents`
            **Discord.JS sürümü:** v${require('discord.js').version}
            **NodeJS sürümü:** ${process.version}
            `,
            true
          )
          .addField('» Kullanılan bellek boyutu', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024).toLocaleString()} MB`, true)
          .addField('» İşletim sistemi', `${osType} ${osBit}`)
          .addField('» İşlemci', `\`\`\`xl\n${os.cpus().map(i => `${i.model}`)[0]}\n\`\`\``);

        m.edit({ embeds: [embed] });
      }, 3000);
    });
  }
};