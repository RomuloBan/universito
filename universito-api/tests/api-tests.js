'use strict'

const test = require('ava')
const util = require('util')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const agentFixtures = require('./fixtures/agent')
const auth = require('../auth')
const sign = util.promisify(auth.sign)
const config = require('../config')

let sandbox = null
let server = null
let dbStub = null
let token = null
let AgentStub = {}
let MetricStub = {}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  dbStub = sinon.stub()
  dbStub.returns(Promise.resolve({
    Agent: AgentStub,
    Metric: MetricStub
  }))

  AgentStub.findConnected = sandbox.stub()
  AgentStub.findConnected.returns(Promise.resolve(agentFixtures.connected))

  token = await sign({ admin: true, username: 'universito' }, config.auth.secret)
  const api = proxyquire('../api', {
    'universito-db': dbStub
  })

  server = proxyquire('../server', {
    './api': api
  })
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test.serial.cb('/api/agents', t => {
  request(server)
    .get('/api/agents')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return ab¡n error')
      let body = JSON.stringify(res.body)
      let expected = JSON.stringify(agentFixtures.connected)
      t.deepEqual(body, expected, 'response body should be the expected')
      t.end()
    })
})
test.serial.todo('/api/agents - not authorized')
test.serial.todo('/api/agents/:uuid')
test.serial.todo('/api/agents/:uuid - not found')

test.serial.todo('/api/metrics/:uuid')
test.serial.todo('/api/metrics/:uuid - not found')

test.serial.todo('/api/metrics/:uuid/:type')
test.serial.todo('/api/metrics/:uuid/:type - not found')
