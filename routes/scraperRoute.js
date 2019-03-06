const db = require('../models')
cheerio = require('cheerio')
axios = require('axios')

module.exports = (app) => {
    app.get('/scrape', (req, res) => {
        axios.get('https://www.mandatory.com/wrestlezone/news')
            .then((res) => {
                const $ = cheerio.load(res.data)
                $('article').each((i, element) => {
                    let result = {}
                    result.title = $(this).children('a').text()
                    result.link = $(this).children('a').attr('href')
                    result.excerpt = $(this).children('p').text()
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
}