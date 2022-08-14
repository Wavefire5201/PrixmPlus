module.exports = {
    name: "interactionCreate",
    execute(interaction) {
        console.log(
            `Command Event => [${interaction.user.tag}] in [#${interaction.channel.name}] [${interaction.guild.name}] used [${interaction.commandName}].`
        );
    },
};
