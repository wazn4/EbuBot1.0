const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dc')
    .setDescription('Doğruluk cesaret oyununu başlatır.')
    .addUserOption(option => option.setName('kullanici').setDescription('Doğruluk cesaret oyununu oynamak istediğiniz kullanıcıyı etiketleyin.'))
    .setDefaultPermission(false), // Bu komutun varsayılan izni kapalı olacak

  async run(client,interaction) {
    const mentionedUser = interaction.options.getUser('kullanici');

    if (!mentionedUser) {
      return interaction.reply('Bir kullanıcı etiketlemelisiniz.');
    }

    const truthQuestions = [
      // Doğruluk soruları
      // ... 'Bu zamana kadar yaptığın en utanç verici şey nedir?',
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

    const dareQuestions = ['Bir kutu dondurma yemeden 24 saat geçirebilir misin?',
    'Yüksek sesle şarkı söyleyebilir misin?',
    'Sokakta yabancılara dans edebilir misin?',
    'En utanç verici anını anlatır mısın?',
    'Birine doğrudan "Seni seviyorum" diyebilir misin?',
    'Discord ses kanalında seçilen şarkıyı söyle.',
    'Telefon rehberindeki en sevdiğin kişiyi göster.',
    'Birine doğrudan "Seni seviyorum" diyebilir misin?',
    'Yüksek sesle bir şiir okuyabilir misin?',
    'Telefonunda en utanç verici fotoğrafını gösterebilir misin?'
      // Cesaret soruları
      // ...
    ];

    const randomTruthIndex = Math.floor(Math.random() * truthQuestions.length);
    const randomDareIndex = Math.floor(Math.random() * dareQuestions.length);
    const randomTruthQuestion = truthQuestions[randomTruthIndex];
    const randomDareQuestion = dareQuestions[randomDareIndex];

    const embed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`${mentionedUser.username} ile Doğruluk mu Cesaret mi?`)
      .setDescription('Sıra sende, doğruluk mu cesaret mi? (Önemli Not:**Butona sadece etiketlediğiniz kişi tıklayabilir**')
      .setFooter(`${interaction.user.username} tarafından istendi.`);

    const truthButton = new MessageButton()
      .setCustomId('truth')
      .setLabel('Doğruluk')
      .setStyle('SUCCESS');

    const dareButton = new MessageButton()
      .setCustomId('dare')
      .setLabel('Cesaret')
      .setStyle('DANGER');

    const row = new MessageActionRow().addComponents(truthButton, dareButton);

    interaction.reply({ embeds: [embed], components: [row] }).then(() => {
      const filter = (i) => i.user.id === mentionedUser.id && (i.customId === 'truth' || i.customId === 'dare');
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', (i) => {
        collector.stop();

        const answer = i.customId === 'truth' ? 'Doğruluk' : 'Cesaret';
        const question = i.customId === 'truth' ? randomTruthQuestion : randomDareQuestion;

        const responseEmbed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle(`${mentionedUser.username} ile Doğruluk mu Cesaret mi? `)
          .setDescription(`${mentionedUser.username}, butona tıkladı ve ${answer} seçti!`)
          .addField('Soru', question);

        interaction.followUp({ embeds: [responseEmbed] });
      });

      collector.on('end', (collected, reason) => {
        if (reason === 'time') {
          interaction.followUp('Yanıt alınmadı, süre doldu.');
        }
      });
    });
  },
};