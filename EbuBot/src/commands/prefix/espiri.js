const { MessageEmbed } = require('discord.js');


const espriListesi = [
  "Seni görünce;\ngözlerim dolar,\nkulaklarım euro.",
  "Kar üzerinde yürüyen adama ne denir. Karabasan.",
  "Yıkanan Ton’a ne denir? Washington!",
  "Seni görünce; \ngözlerim dolar, \nkulaklarım euro.",
  "Kar üzerinde yürüyen adama ne denir. Karabasan.",
  "Yıkanan Ton’a ne denir? Washington!",
  "Gidenin arkasına bakmayın yoksa geleni göremezsiniz.",
  "+Oğlum canlılara örnek ver. \n-Kedi, köpek. \n+Cansızlara örnek ver. \n-Ölü kedi, ölü köpek.",
  "+Kanka ben banyoya 3 kişi giriyom. \n-Oha nasıl? \n+Hacı, Şakir ve ben. \n-Defol lan!",
  "+Kocanızla ortak özelliğiniz ne? \n-Aynı gün evlendik.",
  "+Evladım ödevini neden yapmadın? \n-Bilgisayarım uyku modundaydı, uyandırmaya kıyamadım.",
  "+Bizim arkadaş ortamında paranın lafı bile olmaz. \n-Niye ki? \n+Çünkü hiç birimizin parası yok.",
  "Annemin bahsettiği elalem diye bir örgüt var illuminatiden daha tehlikeli yemin ederim.",
  "+Acıkan var mı ya? \n-Yok bizde tatlı kan var.",
  "Yılanlardan korkma, yılmayanlardan kork.",
  "+Baykuşlar vedalaşırken ne der? \n-Bay bay baykuş.",
  "Beni Ayda bir sinemaya götürme, Marsta bir sinemaya götür.",
  "Aaa siz çok terlemişsiniz durun size terlik getireyim.",
  "Top ağlarda, ben ağlamaz mıyım ?",
  "Burger King, bende vezir",
  "kim tuz yedi! \n 37"
  // Diğer espri cümlelerini buraya ekleyebilirsiniz
];

module.exports = {
  name: 'espiri',
  cooldown: 7000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
  description: 'Rastgele bir espri yapar.',
  run(client, message, args) {
    const espri = espriListesi[Math.floor(Math.random() * espriListesi.length)];
    const embed = new MessageEmbed()
      .setColor('#5865F2')
      .setDescription(espri);

    message.channel.send({ embeds: [embed] });
  },
};