// F&S Copyright 2022. (MIT)
const BotManager = require('./bot/bot')

const WebManager = require('./web/web')

const Server = require('./web/web')

const Database = require('better-sqlite3')

console.log("[ F&S ] Starting!")

const Object = {}

Object.db = new Database('data.sqlite')
Object.config = require('./config.json')
//Object.server = new Server(Object).run()

new BotManager({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: 32767,
    disableMentions: 'everyone',
},Object).run()

//new WebManager(Object).run()