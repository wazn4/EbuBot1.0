const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const axios = require('axios');






module.exports = {
    data: new SlashCommandBuilder()
      .setName('news')
      .setDescription('Displays the current news and allows navigation through the news.'),
    async run(client, interaction) {
      const apiKey = '9275de3f0b854c5ebeff49f3b6b90c49';
      const url = `https://newsapi.org/v2/top-headlines?country=tr&apiKey=${apiKey}`;
  
      try {
        const response = await axios.get(url);
        const newsData = response.data;
  
        // Create the initial news embed
        const newsEmbed = new MessageEmbed()
          .setTitle('Current News')
          .setDescription(newsData.articles[0].title)
          .setURL(newsData.articles[0].url)
          .setAuthor({ name: newsData.articles[0].source.name, iconURL: newsData.articles[0].urlToImage })
          .setFooter(`Page 1 of ${Math.ceil(newsData.totalResults / 10)}`);
  
        // Create the "Advance" button
        const advanceButton = new MessageButton()
          .setCustomId('advance')
          .setLabel('İlerlettir')
          .setStyle('PRIMARY');
  
        // Create the "Regress" button
        const regressButton = new MessageButton()
          .setCustomId('regress')
          .setLabel('Gerilettir')
          .setStyle('PRIMARY');
  
        // Create the button row
        const buttonRow = new MessageActionRow()
          .addComponents(advanceButton, regressButton);
  
        // Send the initial news embed with the buttons
        const message = await interaction.reply({ embeds: [newsEmbed], components: [buttonRow], fetchReply: true });
  
        // Listen for button clicks
        const filter = i => i.user.id === interaction.user.id;
        const collector = message.createMessageComponentCollector({ filter, time: 600000});
  
        let currentPage = 1;
  
        collector.on('collect', async (interaction) => {
          if (interaction.customId === 'advance') {
            currentPage++;
            if (currentPage > Math.ceil(newsData.totalResults / 10)) currentPage = Math.ceil(newsData.totalResults / 10);
            if (currentPage * 10 - 10 >= newsData.articles.length) currentPage--;
            const article = newsData.articles[currentPage * 10 - 10];
            newsEmbed.setTitle(`News #${currentPage * 10 - 9}`)
              .setDescription(article.title)
              .setURL(article.url)
              .setAuthor({ name: article.source.name, iconURL: article.urlToImage })
              .setFooter(`Page ${currentPage} of ${Math.ceil(newsData.totalResults / 10)}`);
          } else if (interaction.customId === 'regress') {
            currentPage--;
            if (currentPage < 1) currentPage = 1;
            if (currentPage * 10 - 10 < 0) currentPage++;
            const article = newsData.articles[currentPage * 10 - 10];
            newsEmbed.setTitle(`News #${currentPage * 10 - 9}`)
              .setDescription(article.title)
              .setURL(article.url)
              .setAuthor({ name: article.source.name, iconURL: article.urlToImage })
              .setFooter(`Page ${currentPage} of ${Math.ceil(newsData.totalResults / 10)}`);
          }
          await interaction.update({ embeds: [newsEmbed], components: [buttonRow] });
        });
  
        collector.on('end', () => {
          message.edit({ components: [] });
        });
  
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while fetching the news!', ephemeral: true });
      }
    },
  };
  