const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');

module.exports = {
  name: 'ye',
  description: 'Bir kişiyi anime kızının üzerinde, diğerini hamburgerde yemek istediği bir resim olarak dönüştürür.',
  cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
  async run(client,message, args) {
    const animeGirlUrl = 'https://p4.wallpaperbetter.com/wallpaper/653/942/359/5bd2b03020a2f-wallpaper-preview.jpg';
    const mentionedUser = message.mentions.users.first();

    if (!mentionedUser) {
      return message.reply('Bir kullanıcı etiketlemelisiniz.');
    }

    try {
      const canvas = Canvas.createCanvas(600, 600);
      const context = canvas.getContext('2d');

      const animeGirlImage = await Canvas.loadImage(animeGirlUrl);
      context.drawImage(animeGirlImage, 0, 0, canvas.width, canvas.height);

      const mentionedAvatar = await Canvas.loadImage(mentionedUser.displayAvatarURL({ format: 'png' }));
      const userAvatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));

      const animeGirlSize = 400;
      const animeGirlX = (canvas.width - animeGirlSize) / 2;
      const animeGirlY = (canvas.height - animeGirlSize) / 2 - 50;

      // Anime kızının üzerine komutu kullanan kişinin avatarını ekleme
      const userAvatarSize = 150;
      const userAvatarX = (canvas.width - userAvatarSize) / 2;
      const userAvatarY = (canvas.height - userAvatarSize) / 2 - 200;
      context.drawImage(userAvatar, userAvatarX, userAvatarY, userAvatarSize, userAvatarSize);

      // Hamburgerde yemek istediği kişinin avatarını ekleme
      const hamburgerSize = 150;
      const hamburgerX = (canvas.width - hamburgerSize) / 2;
      const hamburgerY = (canvas.height - hamburgerSize) / 2 + 100;
      context.drawImage(mentionedAvatar, hamburgerX, hamburgerY, hamburgerSize, hamburgerSize);

      const attachment = new MessageAttachment(canvas.toBuffer(), 'ye_resim.png');
      message.channel.send({ files: [attachment] });
    } catch (error) {
      console.error(error);
      message.reply('Bir hata oluştu!');
    }
  },
};