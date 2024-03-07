 
const {MessageEmbed} = require ("discord.js")

module.exports = {
  name: "kick",
  description: "Kick komutu",
  run(client,message, args) {
    // Komutu kullanan kişinin yönetici izni olup olmadığını kontrol et
  
    // İlk argüman olarak verilen kullanıcıyı al
    let user = message.mentions.users.first();
    // Kullanıcıyı bulamazsa hata mesajı gönder
    if (!user) {
      return message.reply("Lütfen kicklemek istediğin kullanıcıyı etiketle!");
    }
    // Kullanıcının sunucudaki üye bilgisini al
    let member = message.guild.members.resolve(user);
    // Üye bilgisini bulamazsa hata mesajı gönder
    if (!member) {
      return message.reply("Bu kullanıcı sunucuda bulunmuyor!");
    }
    // Üyeyi kicklemeye çalış
    member.kick(args.slice(1).join(" "))
      .then(() => {
        // Başarılı olursa embed mesajı oluştur
        let embed = new MessageEmbed()
          .setColor("#5865F2")
          .setTitle("Kick işlemi başarılı!")
          .setDescription(`${user.tag} başarıyla kicklendi!`)
          .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
          .setTimestamp();
        // Embed mesajını gönder
        message.channel.send({ embeds: [embed] });
        // Kicklenen kullanıcıya özel mesaj gönder
        user.send(`Selamlar, bugün ${message.createdAt.toLocaleTimeString()} saatinde ${message.author.tag} tarafından ${message.guild.name} sunucusundan kicklendin. Lütfen kurallara uyun.`);
      })
      .catch(error => {
        // Başarısız olursa hata mesajı gönder
        message.reply(`Üzgünüm, ${user.tag} kickleyemedim. Hata: ${error}`);
      });
  }
};