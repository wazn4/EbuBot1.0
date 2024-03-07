const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sil')
    .setDescription('Belirli bir kanaldaki mesajları siler')
    .addIntegerOption(option => 
      option.setName('miktar')
      .setDescription('Silinecek mesaj miktarını belirtin (1-500)')
      .setRequired(true)),
  async run(interaction) {
    if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
      return interaction.reply({ content: 'Bu komutu kullanmak için yeterli izne sahip değilsiniz.', ephemeral: true });
    }

    const amount = interaction.options.getInteger('miktar');

    if (amount < 1 || amount > 500) {
      return interaction.reply({ content: 'Lütfen 1 ile 500 arasında bir sayı belirtin.', ephemeral: true });
    }

    try {
      const fetched = await interaction.channel.messages.fetch({ limit: amount });
      await interaction.channel.bulkDelete(fetched, true);
      interaction.reply({ content: `Başarıyla ${amount} mesaj silindi.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Mesajları silerken bir hata oluştu.', ephemeral: true });
    }
  },
};
