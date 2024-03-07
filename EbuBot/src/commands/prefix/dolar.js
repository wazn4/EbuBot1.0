const CC = require('currency-converter-lt')
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

const footer = "Ebu Bot"
module.exports = {
	name: 'döviz',
    aliases: ['mod', 'dolar','dovız','doviz'],
	description: 'Döviz Durumunu Gösterir',
	run(client, message, args) {
    let tl = new CC({ from: "TRY", to: "USD", amount: 1 })
    let dolar = new CC({ from: "USD", to: "TRY", amount: 1  })
    let euro = new CC({ from: "EUR", to: "TRY", amount: 1 })
    let sterlin = new CC({ from: "GBP", to: "TRY", amount: 1 })
    let dinar = new CC({ from: "KWD", to: "TRY", amount: 1 })
tl.convert().then(t => {
        var one_tl = t
dinar.convert().then(k => {
        var one_dinar = k
 sterlin.convert().then(s => {
        var one_sterlin = s
    dolar.convert().then(d => {
        var one_dolar = d
        euro.convert().then(e => {
            var one_euro = e
const embed = new MessageEmbed()
.setTitle(" Döviz Kuru")
.setDescription(`
**TL:** [ \`${one_tl} USD\` ]

**Dolar:** [ \`${one_dolar} TL\` düş artıkk]

**Euro:** [ \`${one_euro} TL\` düşşş ]

**Sterlin:** [ \`${one_sterlin} TL\` ]

**Kuveyt Dinarı:** [ \` ${one_dinar} TL\` ]

`)
.setColor("#5865F2")
.setFooter({text:footer})
.setTimestamp()
message.reply({embeds: [embed]})
            
                })
        })
 })
})
})
	},
};