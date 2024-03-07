const { SlashCommandBuilder } = require('@discordjs/builders');
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://Omer:Omer4411@cluster0.7ccqxnm.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'nots';
let db;

client.connect(err => {
  if (err) throw err;
  console.log('Connected to MongoDB');
  db = client.db(dbName);
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName('note')
    .setDescription('Save or retrieve notes')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Add a note')
        .addStringOption(option =>
          option.setName('note').setDescription('The note to add').setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('get')
        .setDescription('Get your notes')
    ),
  async run(client,interaction) {
    if (!interaction.isCommand()) return;

    const { user } = interaction;
    const userId = user.id;
    const noteSubcommand = interaction.options.getSubcommand();

    if (noteSubcommand === 'add') {
      const note = interaction.options.getString('note');
      const collection = db.collection('notes');
      const result = await collection.updateOne(
        { user_id: userId },
        { $set: { notes: note } },
        { upsert: true }
      );
      await interaction.reply(`Note added: ${note}`);
    } else if (noteSubcommand === 'get') {
      const collection = db.collection('notes');
      const note = await collection.findOne({ user_id: userId });
      if (!note) {
        await interaction.reply('You have no notes.');
      } else {
        const embed = new Discord.MessageEmbed()
          .setTitle('Your Notes')
          .setDescription(note.notes)
          .setColor('#0099ff')
          .setFooter(`User ID: ${userId}`);
        await interaction.reply({ embeds: [embed] });
      }
    }
  },
  async init() {
    if (!db) {
      await client.connect();
      db = client.db(dbName);
    }
  }
};