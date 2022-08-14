const fs = require("node:fs");

module.exports = {
    name: "messageUpdate",
    async execute(message, newMessage) {
        if (message.author.bot) return;
        const date = new Date(Date.now()).toLocaleString();
        const folder = `./logs/${message.guild.name}`;
        const path = `./logs/${message.guild.name}/#${message.channel.name}.txt`;
        let content =
            message.attachments.size > 0
                ? `${date} => [${message.author.username}#${message.author.discriminator}] edited a message | Old => [${message.content}] New => [${newMessage.content}] | Old Attachment(s) => `
                : `${date} => [${message.author.username}#${message.author.discriminator}] edited a message | Old => [${message.content}] New => [${newMessage.content}]\n`;
        if (message.attachments.size > 0) {
            message.attachments.forEach((Attachment) => {
                content = content + `[${Attachment.url}]` + " ";
            });
            content = content + "\n";
        }
        // | #${message.channel.name} | ${message.guild.name}

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true }, (err) => {
                if (err) throw err;
            });
        }

        fs.writeFile(path, content, { flag: "a+" }, (err) => {
            if (err) {
                console.log(err);
            }
        });
    },
};
