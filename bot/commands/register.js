const crypto = require('crypto');

module.exports = {
    data: {
        name: "register",
        description: "Register an FA Store account."
    },
    execute(client, interaction, config, db) {
        const data = db.prepare('SELECT * FROM `license` WHERE `ownerid` = ?').get(interaction.user.id)
        
        if (data == undefined) {
            const creationDate = interaction.user.createdAt
            if (Date.now() - creationDate > 1000*60*60*24*3) {
                var text = ''
                while (text == '') {
                    const code = crypto.randomUUID()
                    const data = db.prepare('SELECT * FROM `license` WHERE `license` = ?').get(code)
                    if (data == null) text=code;
                }

                db.prepare('INSERT INTO `license` (`license`, `ownerid`, `password`) VALUES (?, ?, ?)').run(
                    text,
                    interaction.user.id,
                    null
                )
                return interaction.reply({embeds:[
                    {
                        "title": "Registration was a success!",
                        "description": "You now have an F&A Store account.\nYou can now have an license, find it using /account.\n\nSet a license-password to be able to secure your license, using /password",
                        "color": 3913457
                    }
                ]})
            } else {
                const days = 3-Math.round((Date.now()-creationDate)/1000/60/60/24)
                return interaction.reply({embeds:[
                {
                    "title": "Your registration failed...",
                    "description": "Your account need to be over **3** days old to create an F&A account.\nYou need wait **"+days+"** days to be able to register.",
                    "color": 16734296
                }
                ]})
            }
        } else {
            return interaction.reply({embeds:[
                {
                    "title": ":interrobang: Error while creating account.",
                    "description": "You already have an account, and therefore you cannot create register an new one.",
                    "color": 15809353
                }
            ]})
        }
    }
}