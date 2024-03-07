const { MessageEmbed, MessageButton, MessageSelectMenu, MessageActionRow } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yardım')
    .setDescription('Uygulamanın veya botun nasıl kullanılacağına dair bilgi verir'),
  async run(client, interaction) {
    // Embed oluşturma
    const embed = new MessageEmbed()
      .setTitle('Yardım')
      .setDescription('Uygulamanın veya botun komutlarını öğrenmek için aşağıdaki seçeneklerden birini seçiniz.')
      .setColor('BLUE')
      .setTimestamp()
 .setFields(
        { name: '🟨ebu!sunucu', value: 'Sunucunuz için komutları gösterir', inline: true },
        { name: '🟧ebu!eğlence', value: 'Eğlence komutlarını gösterir.', inline: true },
        { name: '🟦ebu!genel', value: 'Genel komutları gösterir.', inline: true },
        { name: '🟪ebu!bot', value: 'Bot hakkında komutları gösterir', inline: true },
        { name: '🟥ebu!modreasyon', value: 'moderasyon komutlarını gösterir', inline: true }
      );

    // Buton oluşturma
    const button = new MessageButton()
      .setCustomId('yardım_buton')
      .setLabel('Tüm Komutlar')
      .setStyle('PRIMARY');

    // Select Menu oluşturma
    const selectMenu = new MessageSelectMenu()
      .setCustomId('yardım_menu')
      .setPlaceholder('Bir kategori seçiniz')
      .addOptions([
        {
          label: '🟦Genel',
          description: 'Genel komutlar',
          value: 'genel',
        },
        {
          label: '🟧Eğlence',
          description: 'Eğlence komutları',
          value: '31',
        },
        {
          label: '🟥Moderasyon',
          description: 'Moderasyon komutları',
          value: 'moderasyon',
        },
        {
          label: '⬜Sunucu Ayarları',
          description: 'Sunucunuz İçin Gerekli Komutlar',
          value: 'sun',
        },
      ]);

    // Action Row oluşturma

    const row2 = new MessageActionRow().addComponents(selectMenu); // Select menuyu ikinci action row'a koy

    // Embed, buton ve select menu gönderme
    await interaction.reply({ embeds: [embed], components: [ row2] }); // İki action row'u da gönder

    // Buton veya select menu ile etkileşimi yakalama
    const filter = (i) => i.customId === 'yardım_buton' || i.customId === 'yardım_menu';
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 600000 });

    collector.on('collect', async (i) => {
      // Etkileşimi onaylama
      await i.deferUpdate();

      // Buton ile etkileşim olduysa
     

      // Select menu ile etkileşim olduysa
      if (i.customId === 'yardım_menu') {
        // Seçilen değere göre kategori komutlarını bir embed olarak gönderme
        const value = i.values[0];
        // Embed nesnesi oluşturma
        const categoryEmbed = new MessageEmbed()
          .setTitle('Yardım')
          .setColor('BLUE')
          .setTimestamp();
          if (value === 'genel') {
            categoryEmbed
              .setDescription('🟦Genel komutlar şunlardır:')
              .addFields(
                { name: 'ebu!ping', value: 'Botun gecikmesini ölçer.' },
                { name: 'ebu!avatar', value: 'Bir kullanıcının avatarını gösterir.' },
                { name: 'ebu!havadurumu Malatya', value: 'Şehrinizin havadurumunu gösterir' },
                { name: 'ebu!sunucubilgi', value: 'Sunucu hakkında bilgileri öğrenebilirsiniz' },
                { name: 'ebu!botbilgi', value: 'Bot hakkında bilgi alabilirsiniz' },
                { name: 'ebu!notal not', value: 'ebu!notal 31 örnek' },
                { name: 'ebu!notum ', value: 'notunuza bakarsınız' },
              );
          }
  
          if (value === '31') {
            categoryEmbed
              .setDescription('🟧Eğlence komutları şunlardır:')
              .addFields(
                { name: 'ebu!espiri ', value: 'hayattan soğutur benden demesi' },
                { name: 'ebu!ye @user', value: 'hayattan soğursun benden demesi' },
                { name: 'ebu!dc @user', value: 'doğruluk cesaret oynarsınız' },
                { name: 'ebu!yazı-tura #seçenek @user', value: 'ÖR: ebu!yazı-tura Yazı gibi' },

              );
          }
          if (value === 'moderasyon') {
            categoryEmbed
              .setDescription('🟥Moderasyon komutları şunlardır:')
              .addFields(
                { name: 'ebu!ban', value: 'Bir kullanıcıyı sunucudan yasaklar.' },
                { name: 'ebu!kick', value: 'Bir kullanıcıyı sunucudan atar.' },
                { name: 'ebu!mute', value: 'Bir kullanıcıyı susturur.' },
                { name: 'ebu!unmute', value: 'Bir kullanıcının susturmasını kaldırır.' },
                { name: 'ebu!addegistirme @user isim', value: 'Kullanıcının ismini değiştirebilirsiniz' }
              );
          }
          if (value === 'sun') {
            categoryEmbed
              .setDescription('⬜Sunucu komutları şunlardır: bunlar eklencekdir şuanlık eklenmemiştir!!')
              .addFields(
                { name: 'ebu!otorol', value: 'açar.' },
                { name: 'ebu!otorolkapat', value: 'kapatır' },
                { name: 'ebu!sayaç ', value: 'açar.' },
                { name: 'ebu!sayaçkapat', value: 'kapatır.' }
              );
          }
  
        // Embed nesnesini gönderme
        await i.editReply({ embeds: [categoryEmbed] });
      }
    });
  },
};
