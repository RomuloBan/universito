# universito-db

## Usage

``` js
const setupDatabase = require('universto-db')

setupDatabase(config).then(db => {
  const { Agent, Metric } = db
}).catch(err => console.error(err))

```

