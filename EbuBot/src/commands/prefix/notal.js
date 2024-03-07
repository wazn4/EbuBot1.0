const fs = require('fs');

// Bu, JSON dosyasının adıdır. Bu dosyayı önceden oluşturmanız gerekir.
const notesFile = 'notes.json';

// Bu, JSON dosyasını okuyan ve bir JavaScript nesnesine dönüştüren bir fonksiyondur.
const readNotes = () => {
  // Dosyayı okuyun ve bir değişkene atayın.
  const data = fs.readFileSync(notesFile, 'utf-8');
  // Veriyi JSON olarak ayrıştırın ve bir nesneye dönüştürün.
  const notes = JSON.parse(data);
  // Nesneyi döndürün.
  return notes;
};

// Bu, bir JavaScript nesnesini JSON'a dönüştüren ve JSON dosyasına yazan bir fonksiyondur.
const writeNotes = (notes) => {
  // Nesneyi JSON olarak dizeleştirin.
  const data = JSON.stringify(notes, null, 2);
  // Dosyaya yazın.
  fs.writeFileSync(notesFile, data, 'utf-8');
};

// Bu, bir not ekleme komutudur. Kullanıcı ebu!notal <not> şeklinde yazmalıdır.
module.exports = {
  name: 'ebu!notal',
  description: 'Bir not ekler.',
  execute(message, args) {
    // Kullanıcının ID'sini alın.
    const userId = message.author.id;
    // Kullanıcının girdiği notu alın.
    const note = args.join(' ');
    // Notun uzunluğunu kontrol edin. Boş veya çok uzun olmamalıdır.
    if (!note || note.length > 100) {
      return message.reply('Lütfen geçerli bir not girin. Notunuz 100 karakterden fazla olmamalıdır.');
    }
    // Notları okuyun.
    const notes = readNotes();
    // Kullanıcının notlarını alın. Eğer yoksa, boş bir dizi oluşturun.
    const userNotes = notes[userId] || [];
    // Kullanıcının not sayısını kontrol edin. 10'dan fazla olmamalıdır.
    if (userNotes.length >= 10) {
      return message.reply('En fazla 10 not ekleyebilirsiniz. Lütfen önce bazı notlarınızı silin.');
    }
    // Notu kullanıcının notlarına ekleyin.
    userNotes.push(note);
    // Notları güncelleyin.
    notes[userId] = userNotes;
    // Notları yazın.
    writeNotes(notes);
    // Kullanıcıya başarılı bir şekilde not eklendiğini bildirin.
    message.reply(`Notunuz eklendi: "${note}"`);
  },
};