const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Bir kullanıcının susturmasını kaldırır.")
    .addUserOption(option => option.setName("target").setDescription("Susturması kaldırılacak kullanıcıyı seçin.").setRequired(true)),
  run: async (client, interaction) => {
    // mute rolünü bul
    const muteRole = interaction.guild.roles.cache.find(r => r.name === "Muted");

    if (!muteRole) {
      return interaction.reply({ content: "Mute rolü bulunamadı.", ephemeral: true });
    }

    // komutu kullanma iznini kontrol et
    const authorPerms = interaction.channel.permissionsFor(interaction.member);
    if (!authorPerms || !authorPerms.has(Permissions.FLAGS.MUTE_MEMBERS)) {
      return interaction.reply({ content: "Bu komutu kullanmak için yeterli izniniz yok.", ephemeral: true });
    }

    // hedef kullanıcıyı al
    const target = interaction.options.getUser("target");

    // hedef kullanıcının mute rolünü kaldır
    await interaction.guild.members.cache.get(target.id).roles.remove(muteRole.id); 

    // embed mesajı oluştur
    const embed = new MessageEmbed()
      .setTitle("Unmute")
      .setColor("#00FF00")
      .addField("Susturması Kaldırılan Kullanıcı", target ? target.username : "Belirtilmedi", true)
      .addField("Susturan Kullanıcı", interaction.user ? interaction.user.username : "Belirtilmedi", true)
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
