const db = require('../models')
cheerio = require('cheerio')
axios = require('axios')

module.exports = (app) => {
    app.get('/scrape', (req, res) => {
        axios.get('https://www.mandatory.com/wrestlezone/news')
            .then((res) => {
                const $ = cheerio.load(res.data)

                // Need help selecting the right element //
                $('article').each((i, element) => {
                    let result = {}
                    result.title = $(this).children('a').text('title')
                    result.link = $(this).children('a').attr('href')
                    result.image = $(this).children('a').children('div').children('img').attr('src')
                    result.excerpt = $(this).children('div').children('div').children('div').children('div').children('div').children('p').text()
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