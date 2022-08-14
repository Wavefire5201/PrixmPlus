const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const axios = require("axios").default;
const { youtubeKey } = require("./config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ytstats")
        .setDescription("Get basic stats for a YT channel!")
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("The channel to get stats for")
                .setRequired(true)
        ),
    async execute(interaction) {
        const channel = await interaction.options.getString("name");
        axios
            .get(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${channel}&key=${youtubeKey}`
            )
            .then((res) => {
                const channelID = res.data["items"][0].id.channelId;
                const channelThumbnail =
                    res.data["items"][0].snippet.thumbnails.default.url;
                const channelDescription =
                    res.data["items"][0].snippet.description;
                const channelTitle = res.data["items"][0].snippet.title;
                axios
                    .get(
                        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelID}&key=${youtubeKey}`
                    )
                    .then((res) => {
                        const subs =
                            res.data["items"][0].statistics.subscriberCount;
                        const views = res.data["items"][0].statistics.viewCount;
                        const videos =
                            res.data["items"][0].statistics.videoCount;

                        const embed = new EmbedBuilder()
                            .setTitle(`${channelTitle}`)
                            .setURL(`https://youtube.com/channel/${channelID}`)
                            .setThumbnail(channelThumbnail)
                            .addFields(
                                {
                                    name: "Description",
                                    value: channelDescription,
                                },
                                { name: "Subscribers", value: subs },
                                { name: "Views", value: views },
                                { name: "Videos", value: videos }
                            )
                            .setTimestamp()
                            .setFooter({ text: `${channelTitle}` });
                        interaction.reply({ embeds: [embed] });
                    })
                    .catch((error) => {
                        interaction.reply("Channel was not found!");
                        console.error(error);
                    });
            });
    },
};
