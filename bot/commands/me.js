module.exports = {
    data: {
        name: "account",
        description: "Your FA Store account."
    },
    execute(client, interaction, config, db) {
        const data = db.prepare('SELECT * FROM `license` WHERE `ownerid` = ?').get(interaction.user.id)
        
        if (data == undefined) {
            return interaction.reply({embeds:[
            {
                "title": ":interrobang: Error loading your data...",
                "description": "You do not have any data to show. :interrobang:\n\nUse the command /register to register an FA Store Account.",
                "color": 15809353
            }
            ]})
        } else {
            const license = data.license
            return interaction.reply({embeds:[
                {
                    "title": "Your FA Store account.",
                    "description": "Here you got some data on your account. \nPlease do not share any of these details, or else users can stell your *license*.\n**License**: ||"+license+"||\n**Owner**: "+interaction.user.id+"\n**License Password**: ||"+data.password+"||\n**Scripts**:",
                    "color": 3913457
                }
            ]})    
        }
    }
}