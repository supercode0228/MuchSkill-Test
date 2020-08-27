const { merge } = require('lodash')

const departments = require('./departments')
const techtools = require('./techtools')

module.exports = merge(departments, techtools)
