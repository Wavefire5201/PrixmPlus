const { ActivityType } = require("discord.js");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Ready! => Logged in as ${client.user.tag}`);
        client.user.setActivity("amog gus | In development", {
            type: ActivityType.Playing,
        });

        const videoList = [
            "https://www.youtube.com/watch?v=iApALnRP8jo",
            "https://www.youtube.com/shorts/4c02rQtkhEM",
            "https://www.youtube.com/watch?v=UpN00dhI3PI",
            "https://www.youtube.com/watch?v=-d5WYWS8e_Q",
            "https://www.youtube.com/shorts/eWpS4hPftkI",
            "https://www.youtube.com/watch?v=9miuh8-KNBU",
            "https://www.youtube.com/watch?v=atCGLVUU4p0",
        ];
        const testChannelID = "1007328455936979004";
        const mainChannelID = "988977258985295935";
        function randomVideo() {
            const randomTime = Math.floor(Math.random() * 4) + 1;
            const channel = client.channels.cache.get(mainChannelID);

            channel.send(
                `Check out this BANGER video from the [Chinese Covid Asmr Channel and More] channel! ${
                    videoList[Math.floor(Math.random() * videoList.length)]
                }`
            );
            setInterval(
                randomVideo,
                randomTime * 2500000 + Math.floor(Math.random() * 1500000)
            );
        }

        // randomVideo();
    },
};
