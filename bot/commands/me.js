module.exports = {
    data: {
        name: "me",
        description: "Me"
    },
    execute(client, interaction, config, db) {
        return interaction.reply("lol")
    }
}