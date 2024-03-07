module.exports = {
    name: 'hello',
    description: 'Merhaba mesajı gönderir',
    run(client,message, args) {
        message.channel.send(`Merhaba! <:download:1182963621429530625>`);
    },
};
