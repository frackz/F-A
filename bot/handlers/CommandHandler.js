const { Routes } = require('discord.js')
const { REST } = require('@discordjs/rest')

module.exports = class CommandHandler {
    constructor(client) {
        this.config = client.config
        this.db = client.db
        this.client = client
        this.commands = client.commands
    }

    load() {
        const rest = new REST({ version: '10' }).setToken(this.config.token)
        var data = []
        require('fs').readdirSync('bot/commands').forEach(f => {
            if (!f.endsWith(".js")) {return}
            const e = require('../commands/'+f)
            this.commands[e.data.name] = {
                file: f
            }
            data.push(e.data)
            console.log("[ F&S ] Loaded command /"+e.data.name)
        })
        rest.put(Routes.applicationCommands(this.config.id, '1002311893014286446'), {body: data})
            .then(() => console.log("[ F&S ] Completed all commands"))
            .catch(console.error)
    }
}