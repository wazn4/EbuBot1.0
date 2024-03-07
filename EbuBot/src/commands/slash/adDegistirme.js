const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addeğiştirme')
    .setDescription('Belirtilen kullanıcının adını değiştirir.')
    .addUserOption(option => option.setName('kullanici').setDescription('Adını değiştirmek istediğiniz kullanıcıyı etiketleyin.').setRequired(true))
    .addStringOption(option => option.setName('yeniisim').setDescription('Yeni isim').setRequired(true)),
  async run(client,interaction) {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin.');
    }

    const member = interaction.options.getMember('kullanici');
    if (!member) {
      return interaction.reply('Lütfen bir kullanıcı etiketleyin!');
    }

    const newName = interaction.options.getString('yeniisim');
    if (!newName) {
      return interaction.reply('Lütfen yeni ismi belirtin!');
    }

    try {
      await member.setNickname(newName);
      return interaction.reply(`${member} kullanıcısının ismi başarıyla değiştirildi.`);
    } catch (error) {
      console.error(error);
      return interaction.reply('Hata! Lütfen rolümü en üste taşıyınız ve **Yönetici izni veriniz**.');
    }
  },
};