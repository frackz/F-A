// F&S Copyright 2022. (MIT)
const Discord = require('discord.js')

// Loaders
const EventLoader = require('./handlers/EventHandler')
const CommandLoader = require('./handlers/CommandHandler')

module.exports = class BotManager extends Discord.Client {
    constructor(options, client) {
        super(options)

        this.commands = {}
        this.db = client.db
        this.config = client.config
        this.server = client.server
    }

    run() {
        new EventLoader(this).load()
        new CommandLoader(this).load()

        this.login(this.config.token)
    }
}