# universito-agent

## Usage

``` js
const UniversitoAgent = require('universito-agent')

const agent = new UniversitoAgent({
  interval: 2000
})

agent.connect()

agent.on('agent/message', payload => {
  console.log(payload)
})

setTimeout(() => agent.disconnect(), 20000)
```