'use strict'

const db = require('./')
const debug = require('debug')('universito:db:setup')

async function setup () {
  const config = {
    database: process.env.BD_NAME || 'universito',
    username: process.env.DB_USER || 'romulo',
    password: process.env.DB_PASS || 'romulo',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }
  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err)
  console.error(err.stack)
  process.exit(1)
}

setup()
