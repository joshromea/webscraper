//Testing Scraper with success!!!!//
const cheerio = require('cheerio')
const axios = require('axios')

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
        })
    })