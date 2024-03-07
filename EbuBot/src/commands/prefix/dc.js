const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'dc',
  cooldown: 7000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
  description: 'Doğruluk cesaret oyununu başlatır.',
  async run(client, message, args) {
    const mentionedUser = message.mentions.users.first();

    if (!mentionedUser) {
      return message.reply('Bir kullanıcı etiketlemelisiniz.');
    }

    const truthQuestions = [
      'Bu zamana kadar yaptığın en utanç verici şey nedir?',
      'En sevdiğin film hangisi?',
      'Bir gün boyunca yapabileceğin en çılgın şey nedir?',
      'En sevmediğin yemek hangisi?',
      'Hiç pişmanlık duyduğun bir kararın oldu mu? Ne olduğunu söyler misin?',
      'Bir uygulamayı telefonunuzdan silmek zorunda kalsanız hangisini silerdiniz?',
      'Messi mi Ronaldo mu?',
      'Pes mi Fifa mı?',
      'İlk işin neydi?',
      'Üç gün boyunca bir adada mahsur kalmış olsaydınız, bu odadan kimleri seçerdiniz?',
      'Instagram’da 5 kişiyi silmek zorunda olsan kimleri silerdin?',
      'Hayallerinizdeki kişiyi tarif edin.',
      'İlkokulda ve Lise arasında aşık olduğunuz kişiler kimlerdi?',
      'Kaç çocuk sahibi olmak istersin?',
      'Mevcut erkek arkadaşının ya da kız arkadaşının seninle aynı üniversiteye gitmesini ister misin?',
      'Telefonunda en son arama yaptığın şey neydi?',
      'Sence şu an oynadığın arkadaşın sevimli biri mi?'
    ];

    const dareQuestions = [
      'Bir kutu dondurma yemeden 24 saat geçirebilir misin?',
      'Yüksek sesle şarkı söyleyebilir misin?',
      'Sokakta yabancılara dans edebilir misin?',
      'En utanç verici anını anlatır mısın?',
      'Birine doğrudan "Seni seviyorum" diyebilir misin?',
      'Discord ses kanalında seçilen şarkıyı söyle.',
      'Telefon rehberindeki en sevdiğin kişiyi göster.',
      'Birine doğrudan "Seni seviyorum" diyebilir misin?',
      'Yüksek sesle bir şiir okuyabilir misin?',
      'Telefonunda en utanç verici fotoğrafını gösterebilir misin?'
    ];

    const randomTruthIndex = Math.floor(Math.random() * truthQuestions.length);
    const randomDareIndex = Math.floor(Math.random() * dareQuestions.length);
    const randomTruthQuestion = truthQuestions[randomTruthIndex];
    const randomDareQuestion = dareQuestions[randomDareIndex];

    const embed = new MessageEmbed()
      .setColor('#5865F2')
      .setTitle(`${mentionedUser.username} ile Doğruluk mu Cesaret mi?`)
      .setDescription('Sıra sende, doğruluk mu cesaret mi? (Önemli Not:**Butona sadece etiketlediğiniz kişi tıklayabilir**')
      .setFooter(`${message.author.username} tarafından istendi.`);

    const truthButton = new MessageButton()
      .setCustomId('truth')
      .setLabel('Doğruluk')
      .setStyle('SUCCESS');

    const dareButton = new MessageButton()
      .setCustomId('dare')
      .setLabel('Cesaret')
      .setStyle('DANGER');

    const row = new MessageActionRow().addComponents(truthButton, dareButton);

    message.channel.send({ embeds: [embed], components: [row] }).then(() => {
      const filter = (interaction) => {
        return (
          interaction.user.id === mentionedUser.id &&
          (interaction.customId === 'truth' || interaction.customId === 'dare')
        );
      };

      const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', (interaction) => {
        collector.stop();

        const answer = interaction.customId === 'truth' ? 'Doğruluk' : 'Cesaret';
        const question = interaction.customId === 'truth' ? randomTruthQuestion : randomDareQuestion;

        const responseEmbed = new MessageEmbed()
          .setColor('#5865F2')
          .setTitle(`${mentionedUser.username} ile Doğruluk mu Cesaret mi? `)
          .setDescription(`${mentionedUser.username}, butona tıkladı ve ${answer} seçti!`)
          .addField('Soru', question);

        message.channel.send({ embeds: [responseEmbed] });
      });

      collector.on('end', (collected, reason) => {
        if (reason === 'time') {
          message.channel.send('Yanıt alınmadı, süre doldu.');
        }
      });
    });
  }
};