// Dependencies //
const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const axios = require('axios')
const cheerio = require('cheerio')
const hb = require('express-handlebars')

const PORT = 3000
const routes = require('./routes')

app = express()

app.use(logger('dev'))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(express.static('public'))
    .use(routes)
    .engine('handlebars', hb({ defaultLayout: 'main' }))
    .set('view engine', 'handlebars')

// Connecting to Mongo Database //
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"

mongoose.connect(MONGODB_URI)

// Listner //
app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`)
});