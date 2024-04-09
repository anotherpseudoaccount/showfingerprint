const express = require('express')
const FileSystem = require('fs')
const app = express()
const logger = require('./utils/logger')
const config = require('./utils/config')
const cors = require('cors')

app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Älä häkyttele!</h1>')
})

app.post('/log/print', (request, response) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  // const print = JSON.parse(request.body)
  try {
    var filename = 'fp_' + new Date().toJSON().slice(0, 10) + '.json'
    FileSystem.writeFile(filename, JSON.stringify(request.body), (error) => {
      if (error) throw error
    })
    response.json(print)
  } catch (error) {
    response.status(400).end()
  }
})

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
