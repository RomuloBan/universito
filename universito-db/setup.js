'use strict'

const db = require('./')
const inquirer = require('inquirer')
const chalk = require('chalk')
const debug = require('debug')('universito:db:setup')

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?'
    }
  ])

  if (!answer.setup) {
    return console.log('Nothing happened :)')
  }
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
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
