const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Bir kullanıcıyı susturur.")
    .addUserOption(option => option.setName("target").setDescription("Susturulacak kullanıcıyı seçin.").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("Susturma sebebinizi yazın.").setRequired(true)),
  // komutu geliştirmek istersen guide: https://v13.discordjs.guide/interactions/slash-commands.html#options
  run: async (client, interaction) => {
    // mute rolünü bul veya oluştur
    let muteRole = interaction.guild.roles.cache.find(r => r.name === "Muted");
    if (!muteRole) {
      try {
        muteRole = await interaction.guild.roles.create({
          name: "Muted",
          color: "#818386",
          permissions: []
        });
        interaction.guild.channels.cache.forEach(async (channel) => {
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

    // komutu kullanma iznini kontrol et
    const authorPerms = interaction.channel.permissionsFor(interaction.member);
    if (!authorPerms || !authorPerms.has(Permissions.FLAGS.MUTE_MEMBERS)) {
      return interaction.reply({ content: "Bu komutu kullanmak için yeterli izniniz yok.", ephemeral: true });
    }

    // hedef kullanıcıyı ve sebepi al
    const target = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason") || "Belirtilmedi";

    // hedef kullanıcıyı sustur
    await interaction.guild.members.cache.get(target.id).roles.add(muteRole.id); // target.id üzerinden kullanıcıya ulaş

    // embed mesajı oluştur
    const embed = new MessageEmbed()
      .setTitle("Mute")
      .setColor("#FF0000")
      .addField("Susturulan Kullanıcı", target ? target.username : "Belirtilmedi", true)
      .addField("Susturan Kullanıcı", interaction.user ? interaction.user.username : "Belirtilmedi", true)
      .addField("Sebep", reason || "Belirtilmedi", true)
      .setTimestamp();

    // buton oluştur
    const button = new MessageButton()
      .setCustomId("unmute")
      .setLabel("Susturulanlar")
      .setStyle("DANGER");

    // butonu içeren satırı oluştur
    const row = new MessageActionRow().addComponents(button);

    // mesajı gönder
    const message = await interaction.channel.send({ content: "Susturulan kullanıcıları görmek için butona basın.", embeds: [embed], components: [row] });

    // butona basıldığında çalışacak fonksiyon
    const collector = message.createMessageComponentCollector({ componentType: "BUTTON", time: 15000 });

    collector.on("collect", async i => {
      if (i.customId === "unmute") {
        // susturulan kullanıcıları bul
        const mutedUsers = interaction.guild.members.cache.filter(m => m.roles.cache.has(muteRole.id));

        // Eğer hiç susturulmuş kullanıcı yoksa mesajı güncelle ve butonları kapat
        if (mutedUsers.size === 0) {
          return i.update({ content: "Susturulan kullanıcı bulunmamaktadır.", components: [] });
        }

        // Susturulan kullanıcıları göster
        const userList = mutedUsers.map(m => `<@${m.id}>`).join("\n");

        const embed = new MessageEmbed()
          .setTitle("Susturulan Kullanıcılar")
          .setColor("#FF0000")
          .setDescription(userList) // userList'i bir alan olarak ekleyin
          .setTimestamp();

        await i.update({ embeds: [embed], components: [] });
      }
    });

    collector.on("end", collected => {
      // butonun süresi dolduğunda mesajı sil
      message.delete();
    });
  }
};
