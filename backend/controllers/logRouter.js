const FileSystem = require('fs')
const logRouter = require('express').Router()
const logger = require('../utils/logger')

logRouter.post('/print', (request, response) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  // const print = JSON.parse(request.body)
  try {
    const print = request.body
    var filename = './log/' + print.hash + 'fp_' + new Date().toJSON().slice(0, 10) + '.json'
    FileSystem.writeFile(filename, JSON.stringify(print), (error) => {
      if (error) throw error
    })
    response.status(200).json(print)
  } catch (error) {
    console.log(error)
    response.status(400).end()
  }
})

module.exports = logRouter
