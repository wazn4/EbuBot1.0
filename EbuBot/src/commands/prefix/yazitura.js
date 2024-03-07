const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'yazı-tura',
  description: 'Yazı tura atar.',
  usage: 'yazı-tura',
  aliases: ['yazı tura', 'yazi-tura', 'yazi tura'],
  cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
  category: 'eğlence',
  run(client,message, args) {
    const sides = ['Yazı', 'Tura'];
    const result = sides[Math.floor(Math.random() * sides.length)];
    const userChoice = args[0] ? args[0].toLowerCase() : '';

    if (userChoice !== 'yazı' && userChoice !== 'tura') {
      return message.reply('Lütfen yazı ya da tura seçeneğini belirtin!');
    }

    const isWin = userChoice === result.toLowerCase();
    const color = isWin ? '#00ff00' : '#ff0000';
    const winLoseText = isWin ? 'Kazandın!' : 'Kaybettin!';

    const embed = new MessageEmbed()
      .setTitle('Yazı Tura')
      .setDescription(`Senin seçimin: **${userChoice}**\nBenim seçimim: **${result}**\n\n${winLoseText}`)
      .setColor(color)
      .setThumbnail(isWin ? 'https://i.gyazo.com/45161aabc9a103a425d0cd359c260afb.png' : 'https://i.gyazo.com/58c24cd06527b16ca0828d42e86650da.png');

    message.channel.send({ embeds: [embed] });
  },
};