'use strict'

const debug = require('debug')('universito:api:db')

module.exports = {
  db: {
    database: process.env.BD_NAME || 'universito',
    username: process.env.DB_USER || 'romulo',
    password: process.env.DB_PASS || 'romulo',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s)
  }
}
