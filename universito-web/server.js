'use strict'

const http = require('http')
const path = require('path')
const express = require('express')
const debug = require('debug')('universito:web')
const chalk = require('chalk')

const port = process.env.PORT || 8080

const app = express()
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')))
debug('App running!')
server.listen(port, () => {
  console.log(`${chalk.green('[universito-web]')} server listening on port ${port}`)
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
