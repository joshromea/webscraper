// Dependencies //
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const hb = require('express-handlebars')

const PORT = 3000
const scraperRoute = require('./routes/scraperRoute')
const apiRoutes = require('./routes/apiRoutes')

app = express()

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(scraperRoute)
app.use(apiRoutes)
app.engine('handlebars', hb({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Connecting to Mongo Database //
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/webscraperHeadlines"

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

// Listner //
app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`)
});

module.exports = app