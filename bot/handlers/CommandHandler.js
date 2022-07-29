module.exports = class CommandHandler {
    constructor(client) {
        this.config = client.config
        this.db = client.db
        this.client = client
        this.commands = client.commands
    }

    load() {
        require('fs').readdirSync('bot/commands').forEach(f => {
            if (!f.endsWith(".js")) {return}
            const e = require('../commands/'+f)
            this.commands[e.data.name] = {
                file: f
            }
            console.log("[ F&S ] Loaded command /"+e.data.name)
            this.client.application?.commands.create(e.data);
        })
    }
}