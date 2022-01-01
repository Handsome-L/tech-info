const config = require('./config')

const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('OK')
})

app.listen(config.app.port, () => {
    console.log(`Running at http://localhost:${config.app.port}`)
})
