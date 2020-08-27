const { mongoDB, mongoHost, mongoUsername, mongoPassword } = require('./config')

const dbURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoHost}/${mongoDB}?retryWrites=true&w=majority`

module.exports = dbURI
