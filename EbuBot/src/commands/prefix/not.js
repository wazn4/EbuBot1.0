const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');

module.exports = {
    name: 'ticket',
    description: 'Destek ekibiyle konuşmak için bir ticket açar',
    async run(client, message, args) { {}
        // Mesaj kanalını al
        const channel = message.mentions.channels.first();
        if (!channel) return message.reply('Lütfen bir mesaj kanalı etiketleyin');

        // Embed mesajını oluştur
        const embed = new MessageEmbed()
            .setTitle('Destek ekibiyle konuşmak istiyorsanız')
            .setDescription('Aşağıdaki butona tıklayarak bir ticket açabilirsiniz')
            .setColor('BLUE');

        const button = new MessageButton()
            .setCustomId('open-ticket')
            .setLabel('Ticket aç')
            .setStyle('PRIMARY');


        const row = new MessageActionRow()
            .addComponents(button);

       
        const sentMessage = await channel.send({ embeds: [embed], components: [row] });

        // Butona tıklanma olayını dinle
        const filter = i => i.customId === 'open-ticket' && i.user.id === message.author.id;
        const collector = sentMessage.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            // Modal ekranını oluştur
            const modal = new Modal()
                .setCustomId('ticket-modal')
                .setTitle('Ticket açmak için bilgilerinizi girin');

            // İsim metin girişi oluştur
            const nameInput = new TextInputComponent()
                .setCustomId('name-input')
                .setLabel('İsim')
                .setStyle('SHORT')
                .setMinLength(1)
                .setMaxLength(32)
                .setPlaceholder('Ali')
                .setRequired(true);

            // Sebeb metin girişi oluştur
            const reasonInput = new TextInputComponent()
                .setCustomId('reason-input')
                .setLabel('Sebeb')
                .setStyle('SHORT')
                .setMinLength(1)
                .setMaxLength(1000)
                .setPlaceholder('Botum çalışmıyor')
                .setRequired(true);

            // Modal'a girişleri ekle
            modal.addComponents(nameInput, reasonInput);

            // Modal'i göster
            await i.showModal(modal);
        });

        collector.on('end', collected => {
            // Zaman aşımı durumunda mesaj kanalına bilgi ver
            if (collected.size === 0) {
                channel.send('Ticket açma işlemi zaman aşımına uğradı');
            }
        });

        // Modal gönderme olayını dinle
        const modalFilter = i => i.customId === 'ticket-modal' && i.user.id === message.author.id;
        const modalCollector = message.channel.createMessageModalCollector({ modalFilter, time: 60000 });

modalCollector.on('collect', async i => {
    // Ticket kanalını oluştur
    const ticketChannel = await message.guild.channels.create(`${i.fields.getTextInputValue('name-input')}-${message.author.username}`, {
        type: 'GUILD_TEXT',
        permissionOverwrites: [
            {
                id: message.guild.id,
                deny: ['VIEW_CHANNEL'],
            },
            {
                id: message.author.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
            },
            {
                id: client.config.supportRoleId,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
            },
        ],
    });

    // Ticket kanalına bilgi mesajı gönder
    const ticketMessage = new MessageEmbed()
        .setTitle('Ticket açıldı')
        .setDescription(`Ticket açan kullanıcı: ${message.author}\nSebep: ${i.fields.getTextInputValue('reason-input')}`)
        .setColor('GREEN');

    await ticketChannel.send({ embeds: [ticketMessage] });

    // Modal kapatma
    await i.reply({ content: 'Ticket açıldı', ephemeral: true });
});

modalCollector.on('end', collected => {
    // Zaman aşımı durumunda mesaj kanalına bilgi ver
    if (collected.size === 0) {
        channel.send('Ticket açma işlemi zaman aşımına uğradı');
    }
});

}}