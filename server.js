// Dependencies //
const express = require('express')
const mongoose = require('mongoose')

const logger = require('morgan')

const app = express()

const db = require('./models')

// Middleware //
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

const PORT = 3000

const hb = require('express-handlebars')
app.engine('handlebars', hb({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Connecting Routes folder //
const apiRoutes = require('./routes/apiRoutes')
const scraperRoute = require('./routes/scraperRoute')

app.use(apiRoutes)
app.use(scraperRoute)

// Connecting to MongoDB/mLab //
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

// Listener //
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})