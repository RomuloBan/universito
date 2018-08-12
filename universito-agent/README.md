# universito-agent

## Usage

``` js
const UniversitoAgent = require('universito-agent')

const agent = new UniversitoAgent({
  interval: 2000
})

agent.connect()

// This Agent only
agent.on('connected')
agent.on('disconnected')
agent.on('message')

agent.on('agent/connected')
agent.on('agent/disconnected')
agent.on('agent/message', payload => {
  console.log(payload)
})

setTimeout(() => agent.disconnect(), 20000)
```