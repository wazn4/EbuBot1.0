module.exports = {
    name: 'addegistirme',
    description: 'Belirtilen kullanıcının adını değiştirir.',
    usage: 'addeğiştirme <@kullanıcı> <yeni isim>',
    
    cooldown: 7000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    async run(client, message, args) {
      if (!message.member.permissions.has('ADMINISTRATOR')) {
        return message.reply('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin.');
      }
  
      const member = message.mentions.members.first();
      if (!member) {
        return message.reply('Lütfen bir kullanıcı etiketleyin!');
      }
  
      const newName = args.slice(1).join(' ');
      if (!newName) {
        return message.reply('Lütfen yeni ismi belirtin!');
      }
  
      try {
        await member.setNickname(newName);
        return message.reply(`${member} kullanıcısının ismi başarıyla değiştirildi.`);
      } catch (error) {
        console.error(error);
        return message.reply('Hata! Lütfen rolümü en üste taşıyınız ve **Yönetici izni veriniz**.');
      }
    },
  };
  