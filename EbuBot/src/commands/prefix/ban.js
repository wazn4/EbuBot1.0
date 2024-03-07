const {MessageEmbed}  = require ("discord.js")
  // ban.js
  module.exports = {
    name: "ban",
    description: "Ban komutu",
    run(client,message, args) {
      // Komutu kullanan kişinin yönetici izni olup olmadığını kontrol et
      if (!message.member.permissions.has("ADMINISTRATOR")) {
        return message.reply("Bu komutu kullanmak için yönetici iznine sahip olmalısın!");
      }
      // İlk argüman olarak verilen kullanıcıyı al
      let user = message.mentions.users.first();
      // Kullanıcıyı bulamazsa hata mesajı gönder
      if (!user) {
        return message.reply("Lütfen banlamak istediğin kullanıcıyı etiketle!");
      }
      // Kullanıcının sunucudaki üye bilgisini al
      let member = message.guild.members.resolve(user);
      // Üye bilgisini bulamazsa hata mesajı gönder
      if (!member) {
        return message.reply("Bu kullanıcı sunucuda bulunmuyor!");
      }
      // Üyeyi banlamaya çalış
      member.ban({ reason: args.slice(1).join(" ") })
        .then(() => {
          // Başarılı olursa embed mesajı oluştur
          let embed = new MessageEmbed()
            .setColor("#5865F2")
            .setTitle("Ban işlemi başarılı!")
            .setDescription(`${user.tag} başarıyla banlandı!`)
            .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
            .setTimestamp();
          // Embed mesajını gönder
          message.channel.send({ embeds: [embed] });
          // Banlanan kullanıcıya özel mesaj gönder
          user.send(`Selamlar, bugün ${message.createdAt.toLocaleTimeString()} saatinde ${message.author.tag} tarafından ${message.guild.name} sunucusundan banlandın. Lütfen kurallara uyun.`);
        })
        .catch(error => {
          // Başarısız olursa hata mesajı gönder
          message.reply(`Üzgünüm, ${user.tag} banlayamadım. Hata: ${error}`);
        });
    }
  };
  