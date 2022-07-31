module.exports = {
    data: {
        name: "scripts",
        description: "Get all scripts user owns.",
        options: [
            {
                type: 6,
                name: "user",
                description: "The user you want see",
                required: true
            }
        ]
    },
    execute(client, interaction, config, db) {
        const member = interaction.options.getMember('user');
        
        const data = db.prepare('SELECT * FROM `license` WHERE `ownerid` = ?').get(member.user.id)
        if (data == null) {return interaction.reply({content: "User is not registered.", ephemeral: true})}

        const d = db.prepare('SELECT * FROM `scripts` WHERE `ownerid` = ?').all(member.user.id)
        var text = []
        for (var i = 0; i < d.length; i++) {
            text.push(d[i].script)
        }
        return interaction.reply({content: "All scripts user owns: \n```"+text+'```', ephemeral: true})
    }
}