require('dotenv').config()
const Sequelize = require('sequelize')

const db = new Sequelize(process.env.CONNECTION_STRING)

module.exports = db