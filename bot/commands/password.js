module.exports = {
    data: {
        name: "password",
        description: "Change your license password.",
        options: [
            {
              type: 3,
              name: "password",
              description: "Your new license password.",
              required: true
            }
          ]
    },
    execute(client, interaction, config, db) {
        const password = interaction.options.getString('password');
        const data = db.prepare('SELECT * FROM `license` WHERE `ownerid` = ?').get(interaction.user.id)
        
        if (data == undefined) {
            return interaction.reply({embeds:[
            {
                "title": ":interrobang: Cannot change password.",
                "description": "You do not have an account\n\nUse the command /register to register an FA Store Account.",
                "color": 15809353
            }
            ]})
        } else {
            if (password.length <= 3) {
                return interaction.reply({embeds:[
                    {
                        "title": "Too short password.",
                        "description": "Your password needs to be over 3 characters.\nPlease type a new one.",
                        "color": 16401990
                    }
                ]})
            }

            db.prepare('UPDATE `license` SET `password` = ? WHERE `ownerid` = ?').run(password, interaction.user.id)

            return interaction.reply({embeds:[
                {
                    "title": "Success! New password.",
                    "description": "Your account now has a new password.\nIf you wanna see your new password, use /account.",
                    "color": 3913457
                }
            ]})    
        }
    }
}