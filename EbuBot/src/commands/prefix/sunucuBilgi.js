const {MessageEmbed} = require ("discord.js")
const moment = require("moment");


module.exports = {
    name: 'sunucubilgi',
    run: async (client, message, args) => {
      const filterLevels = {
        DISABLED: "Off",
        MEMBERS_WITHOUT_ROLES: "No Role",
        ALL_MEMBERS: "Everyone"
      };
  
      const verificationLevels = {
        NONE: "None",
        LOW: "Low",
        MEDIUM: "Medium",
        HIGH: "(╯°□°）╯︵ ┻━┻",
        VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
      };
  
  
      const roles = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString());
      const members = message.guild.members.cache
      const channels = message.guild.channels.cache;
      const emojis = message.guild.emojis.cache;
  
      const embed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name} isimli sunucu bilgileri:` })
        .setColor("BLUE")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField("Genel",
          `**❯ İsim:** \`${message.guild.name}\`\n`+
          `**❯ Sunucu ID'si:** \`${message.guild.id}\`\n`+
          `**❯ Kurucu:** \`${client.users.cache.get(message.guild.ownerId).username}\`\n`+
          `**❯ Kıta:** \`${message.guild.preferredLocale}\`\n`+
          `**❯ Boost Seviyesi** \`${message.guild.premiumTier ? `Level ${message.guild.premiumTier}` : "None"}\`\n`+
          `**❯ Doğrulama seviyesi:** \`${verificationLevels[message.guild.verificationLevel]}\`\n`+
          `**❯ Kurulduğu tarih:** \`${moment(message.guild.createdTimestamp).format("LT")} ${moment(message.guild.createdTimestamp).format("LL")} ${moment(message.guild.createdTimestamp).fromNow()}\`\n`+``)
  
        .addField("İstatistikler",
          `**❯ Toplam rol sayısı** \`${roles.length}\`\n`+
          `**❯ Toplam emoji sayısı:** \`${emojis.size}\`\n`+
          `**❯ Hareketsiz emoji sayısı:** \`${emojis.filter(emoji => !emoji.animated).size}\`\n`+
          `**❯ Hareketli emoji sayısı:** \`${emojis.filter(emoji => emoji.animated).size}\`\n`+
          `**❯ Yazı kanalları:** \`${channels.filter(channel => channel.type === "GUILD_TEXT").size}\`\n`+
          `**❯ Ses kanalları:** \`${channels.filter(channel => channel.type === "GUILD_VOICE").size}\`\n`+
          `**❯ Boost sayısı:** \`${message.guild.premiumSubscriptionCount || "0"}\``)
  
        .addField("Mevcut",
          `**❯ Toplam üye:** \`${message.guild.memberCount}\`\n`+
          `**❯ Kullanıcılar:** \`${members.filter(member => !member.user.bot).size}\`\n`+
          `**❯ Botlar:** \`${members.filter(member => member.user.bot).size}\`\n`)
        .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
        .setTimestamp();
      if (message.guild.description)
        embed.setDescription("**Sunucu açıklaması:** " + message.guild.description);
      message.channel.send({ embeds: [embed] })
  
    },
  };
  