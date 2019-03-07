const db = require('../models')
const app = require('../server')

module.exports = (app) => {
    // Route to get all articles from database //
    app.get('/articles', (req, res) => {
        db.Article.find({})
            .then((dbArticle) => {
                res.json(dbArticle)
            })
            .catch((err) => {
                res.json(err)
            })
    })

    // Route to get 1 article by it's id //
    app.get('/articles/:id', (req, res) => {
        db.Article.findOne({ _id: req.params.id })
            .populate('Note')
            .then((dbArticle) => {
                res.json(dbArticle)
            })
            .catch((err) => {
                res.json(err)
            })
    })

    // route to update/add note //
    app.post('/articles/:id', (req, res) => {
        db.Note.create(req.body)
            .then((dbNote) => {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
            })
            .then((dbArticle) => {
                res.json(dbArticle)
            })
            .catch((err) => {
                res.json(err)
            })
    })
}