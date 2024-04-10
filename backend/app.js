const express = require('express')
const app = express()
const cors = require('cors')
const logRouter = require('./controllers/logRouter')

app.use(cors())
app.use(express.json())
app.use('/log', logRouter)

module.exports = app
