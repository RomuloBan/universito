'use strict'

const debug = require('debug')('universito:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('universito-db')

const config = require('./config')

const api = asyncify(express.Router())

let services, Agent, Metric

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (err) {
      return next(err)
    }
    Agent = services.Agent
    Metric = services.Metric
  }
  next()
})
api.get('/agents', (req, res) => {
  debug('A request has come to /agents')
  res.send({})
})

api.get('/agents/:uuid', (req, res, next) => {
  const { uuid } = req.params

  if (uuid !== 'yyy') {
    return next(new Error('Agent not found'))
  }

  res.send({ uuid })
})

api.get('/metrics/:uuid', (req, res) => {
  const { uuid } = req.params
  res.send({ uuid })
})

api.get('/agents/:uuid/:type', (req, res) => {
  const { uuid, type } = req.params
  res.send({ uuid, type })
})

module.exports = api
