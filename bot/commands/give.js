module.exports = {
    
    
    data: {
        "name": "give",
        "description": "Give a user access to a script.",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "The user you want to give a script",
                "required": true
            },
            {
                "type": 3,
                "name": "script",
                "description": "The script the user gets",
                "choices": [
                    {
                        "name": "FA Loan",
                        "value": "fa-loan"
                    },
                    {
                        "name": "FA Bot",
                        "value": "fa-bot"
                    }
                ],
                "required": true
            }
        ]
    },
    execute(client, interaction, config, db) {
        const script = interaction.options.getString('script'); 
        const member = interaction.options.getMember('user');
        
        const data = db.prepare('SELECT * FROM `license` WHERE `ownerid` = ?').get(member.user.id)
        if (data == null) {return interaction.reply({content: "User is not registered.", ephemeral: true})}

        const d = db.prepare('SELECT * FROM `scripts` WHERE `ownerid` = ? AND `script` = ?').get(member.user.id, script)
        if (d != null) {return interaction.reply({content: "User already has this script.", ephemeral: true})}
        db.prepare('INSERT INTO `scripts` (`script`, `ownerid`) VALUES (?, ?)').run(script, member.user.id)
        return interaction.reply({content: "You granted the user with script "+script, ephemeral: true})
    }
}