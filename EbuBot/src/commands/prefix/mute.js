const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: 'mute',
  description: 'Bir kullanıcıyı susturur ve susturulanları gösterir.',
  run: async (client,message, args) => {
    // Mute rolünü bul veya oluştur
    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!muteRole) {
      try {
        muteRole = await message.guild.roles.create({
          name: "Muted",
          color: "#818386",
          permissions: []
        });
        message.guild.channels.cache.forEach(async (channel) => {
          await channel.permissionOverwrites.edit(muteRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SPEAK: false
          });
        });
      } catch (err) {
        console.error(err);
      }
    }

    // Komutu kullanma iznini kontrol et
    const authorPerms = message.channel.permissionsFor(message.member);
    if (!authorPerms || !authorPerms.has(Permissions.FLAGS.MUTE_MEMBERS)) {
      return message.reply({ content: "Bu komutu kullanmak için yeterli izniniz yok." });
    }

    // Hedef kullanıcıyı ve sebepi al
    const target = message.mentions.members.first();
    const reason = args.slice(1).join(' ') || "Belirtilmedi";

    // Hedef kullanıcıyı sustur
    await target.roles.add(muteRole.id);

    // Embed mesajı oluştur
    const embed = new MessageEmbed()
      .setTitle("Mute")
      .setColor("#FF0000")
      .addField("Susturulan Kullanıcı", target ? target.user.username : "Belirtilmedi", true)
      .addField("Susturan Kullanıcı", message.author.username, true)
      .addField("Sebep", reason || "Belirtilmedi", true)
      .setTimestamp();

    // Buton oluştur
    const button = new MessageButton()
      .setCustomId("unmute")
      .setLabel("Susturulanlar")
      .setStyle("DANGER");

    // Butonu içeren satırı oluştur
    const row = new MessageActionRow().addComponents(button);

    // Mesajı gönder
    const sentMessage = await message.channel.send({ content: "Susturulan kullanıcıları görmek için butona basın.", embeds: [embed], components: [row] });

    // Butona basıldığında çalışacak fonksiyon
    const collector = sentMessage.createMessageComponentCollector({ componentType: "BUTTON", time: 15000 });

    collector.on("collect", async i => {
      if (i.customId === "unmute") {
        // Susturulan kullanıcıları bul
        const mutedUsers = message.guild.members.cache.filter(m => m.roles.cache.has(muteRole.id));

        // Eğer hiç susturulmuş kullanıcı yoksa mesajı güncelle ve butonları kapat
        if (mutedUsers.size === 0) {
          return i.update({ content: "Susturulan kullanıcı bulunmamaktadır.", components: [] });
        }

        // Susturulan kullanıcıları göster
        const userList = mutedUsers.map(m => `<@${m.id}>`).join("\n");

        const embed = new MessageEmbed()
          .setTitle("Susturulan Kullanıcılar")
          .setColor("#FF0000")
          .setDescription(userList)
          .setTimestamp();

        await i.update({ embeds: [embed], components: [] });
      }
    });

    collector.on("end", collected => {
      // Butonun süresi dolduğunda mesajı sil
      sentMessage.delete();
    });
  },
};
