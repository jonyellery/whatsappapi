const { Client, MessageMedia } = require("whatsapp-web.js");
const client = new Client();

const cara = MessageMedia.fromFilePath("./assets/cara.jpeg");
const coroa = MessageMedia.fromFilePath("./assets/coroa.jpeg");
const batman = MessageMedia.fromFilePath("./assets/batman.jpg");
const qrcode = require("qrcode-terminal");

const random = () => (Math.random() < 0.5 ? 1 : 0);

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("client is ready to use");
});

client.on("message_create", async (message) => {
  const msg = message.body.toLowerCase();

  if (msg === "!coroa") {
    const result = random();
    if (result === 1) {
      message.reply(coroa);
      message.reply("caiu COROA, você ganhou!");
    } else {
      message.reply(cara);
      message.reply("caiu CARA, você perdeu!");
    }
  }
  if (msg === "!cara") {
    const result = random();
    if (result === 1) {
      message.reply(cara);
      message.reply("caiu CARA, você ganhou!");
    } else {
      message.reply(coroa);
      message.reply("caiu COROA, você perdeu!");
    }
  }
   if (msg === "batman page punchers") {
      const chat = await message.getChat();
      let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
            text = 'R$ 159,00';
        } 
      await chat.sendMessage(batman);
      await chat.sendMessage(text, { mentions });
      chat.sendMessage("https://animetododialoja.com.br/home/485-dc-page-punchers-mcfarlane-batman-8cm-gibi-hq-sil%C3%AAncio-0789803960640.html", {linkPreview:true});
     }
});
// Mention everyone
client.on('message_create', async (msg) => {
    if(msg.body === '!regras') {
        const chat = await msg.getChat();
        
        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
            text = `1. Se você quer anunciar seus produtos em nosso grupo, será permitido apenas 1 vez por semana. Se você já anunciou alguns produtos essa semana, espere até a próxima semana para anunciar. Vamos manter o feed mais limpo e deixar as conversas fluírem mais.`;
        }

        await chat.sendMessage(text, { mentions });
    }
});

client.initialize();
