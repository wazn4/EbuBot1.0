const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mlist", // komutun adı
  description: "Mutelenen kişileri ve fotoğraflarını gösterir.", // komutun açıklaması
  run(client,message) { // komutun çalıştırılacağı fonksiyon
    // mute rolünü bul
    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!muteRole) {
      return message.reply("Mute rolü bulunamadı.");
    }

    // susturulan kullanıcıları bul
    const mutedUsers = message.guild.members.cache.filter(m => m.roles.cache.has(muteRole.id));

    // Eğer hiç susturulmuş kullanıcı yoksa mesaj gönder
    if (mutedUsers.size === 0) {
      return message.channel.send("Susturulan kullanıcı bulunmamaktadır.");
    }

    // Susturulan kullanıcıları göster
    const userList = mutedUsers.map(m => `<@${m.id}>`).join("\n");

    // Susturulan kullanıcıların fotoğraflarını al
// Susturulan kullanıcıların fotoğraflarını al
const userPhotos = mutedUsers.map(m => m.user.displayAvatarURL({ dynamic: true, size: 64 }));


    // Embed mesajı oluştur
    const embed = new MessageEmbed()
      .setTitle("Susturulan Kullanıcılar")
      .setColor("#5865F2")
      .setDescription(userList) // userList'i bir alan olarak ekleyin
      .setImage(userPhotos.join("\n")) // userPhotos'u bir resim olarak ekleyin
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};
