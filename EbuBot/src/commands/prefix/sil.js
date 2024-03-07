  const { Permissions } = require('discord.js');

  module.exports = {
    name: 'sil',
    description: 'Belirli bir kanaldaki mesajları siler',
    cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    async run(client,message, args) {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
        return message.reply('Bu komutu kullanmak için yeterli izne sahip değilsiniz.');
      }


      const amount = parseInt(args[0]);

      if (isNaN(amount) || amount < 1 || amount > 500) {
        return message.reply('Lütfen 1 ile 500 arasında bir sayı belirtin.');
      }

      try {
        const fetched = await message.channel.messages.fetch({ limit: amount });
        await message.channel.bulkDelete(fetched, true);
        message.reply(`Başarıyla ${amount} mesaj silindi.`);
      } catch (error) {
        console.error(error);
        message.reply('Mesajları silerken bir hata oluştu. Hata sebebi 14 gün önceki mesajları silemem.Discord Api doalyı kaynaklıdır.');
      }
    },
  };
