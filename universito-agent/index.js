'use strict'

const EventEmitter = require('events')

class UniversitoAgent extends EventEmitter {
  constructor (opts) {
    super()
    this.INTERVAL_DEFAULT = 2000
    this._options = opts
    this._started = false
    this._timer = null
    this._interval = opts ? opts.interval : this.INTERVAL_DEFAULT
  }

  connect () {
    if (!this._started) {
      this._started = true

      this.emit('connected')

      this._timer = setInterval(() => {
        this.emit('agent/message', 'this is a message')
      }, this._interval)
    }
  }

  disconnect () {
    if (this._started) {
      clearInterval(this._timer)
      this._started = false
      this.emit('disconnected')
    }
  }
}

module.exports = UniversitoAgent
