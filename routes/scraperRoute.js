const db = require('../models')
const cheerio = require('cheerio')
const axios = require('axios')
const express = require('express')

const router = express.Router()

router.get('/scrape', (req, res) => {
    axios.get('https://www.mandatory.com/wrestlezone/news')
        .then((res) => {
            const $ = cheerio.load(res.data)

            // Need help selecting the right element //
            $('article').each((i, element) => {
                let result = {}
                result.title = $(element).find('a').attr('title')
                result.link = $(element).find('a').attr('href')
                result.excerpt = $(element).children('div').find('p').text()
                result.image = $(element).find('a').children('div').find('img').attr('src')
                console.log(result)
                db.Article.create(result)
                    .then((dbArticle) => {
                        console.log(dbArticle)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
        })
    res.send('Scrape Complete')
})

module.exports = router