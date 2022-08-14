const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("emote")
        .setDescription("spectate and bm"),
    async execute(interaction) {
        const wordList = [
            "he",
            "he",
            "haw",
            "<:hehehehaw:1007425987081945129>",
        ];
        let word = "he";
        await interaction.reply(word);
        for (let i = 0; i < wordList.length; i++) {
            word = word + wordList[i];
            await interaction.editReply(word);
            await wait(100);
        }
    },
};
