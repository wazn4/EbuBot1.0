const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sunucubilgi')
    .setDescription('Sunucu bilgilerini gösterir.'),
  async run(client,interaction) {
    const filterLevels = {
      DISABLED: 'Off',
      MEMBERS_WITHOUT_ROLES: 'No Role',
      ALL_MEMBERS: 'Everyone',
    };

    const verificationLevels = {
      NONE: 'None',
      LOW: 'Low',
      MEDIUM: 'Medium',
      HIGH: '(╯°□°）╯︵ ┻━┻',
      VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻',
    };

    const roles = interaction.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString());
    const members = interaction.guild.members.cache;
    const channels = interaction.guild.channels.cache;
    const emojis = interaction.guild.emojis.cache;

    const embed = new MessageEmbed()
      .setAuthor(`${interaction.guild.name} isimli sunucu bilgileri:`)
      .setColor('BLUE')
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .addField(
        'Genel',
        `**❯ İsim:** \`${interaction.guild.name}\`\n` +
          `**❯ Sunucu ID'si:** \`${interaction.guild.id}\`\n` +
          `**❯ Kurucu:** \`${interaction.guild.owner.user.username}\`\n` +
          `**❯ Kıta:** \`${interaction.guild.preferredLocale}\`\n` +
          `**❯ Boost Seviyesi** \`${interaction.guild.premiumTier ? `Level ${interaction.guild.premiumTier}` : 'None'}\`\n` +
          `**❯ Doğrulama seviyesi:** \`${verificationLevels[interaction.guild.verificationLevel]}\`\n` +
          `**❯ Kurulduğu tarih:** \`${moment(interaction.guild.createdTimestamp).format('LT')} ${moment(interaction.guild.createdTimestamp).format(
            'LL'
          )} ${moment(interaction.guild.createdTimestamp).fromNow()}\`\n`
      )

      .addField(
        'İstatistikler',
        `**❯ Toplam rol sayısı** \`${roles.length}\`\n` +
          `**❯ Toplam emoji sayısı:** \`${emojis.size}\`\n` +
          `**❯ Hareketsiz emoji sayısı:** \`${emojis.filter((emoji) => !emoji.animated).size}\`\n` +
          `**❯ Hareketli emoji sayısı:** \`${emojis.filter((emoji) => emoji.animated).size}\`\n` +
          `**❯ Yazı kanalları:** \`${channels.filter((channel) => channel.type === 'GUILD_TEXT').size}\`\n` +
          `**❯ Ses kanalları:** \`${channels.filter((channel) => channel.type === 'GUILD_VOICE').size}\`\n` +
          `**❯ Boost sayısı:** \`${interaction.guild.premiumSubscriptionCount || '0'}\``
      )

      .addField(
        'Mevcut',
        `**❯ Toplam üye:** \`${interaction.guild.memberCount}\`\n` +
          `**❯ Kullanıcılar:** \`${members.filter((member) => !member.user.bot).size}\`\n` +
          `**❯ Botlar:** \`${members.filter((member) => member.user.bot).size}\`\n`
      )
      .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.avatarURL() })
      .setTimestamp();
    if (interaction.guild.description) embed.setDescription('**Sunucu açıklaması:** ' + interaction.guild.description);
    await interaction.reply({ embeds: [embed] });
  },
};
