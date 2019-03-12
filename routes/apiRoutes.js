const db = require('../models')
const express = require('express')

const router = express.Router()

router.get("/", function (req, res) {
    db.Article.find({})
        .sort({ date: -1 })
        .limit(10)
        .then(function (dbArticle) {
            res.render('home', { article: dbArticle });
        })
        .catch(err => {
            console.log(err)
        })
})


// Get all articles from database //
router.get('/articles', (req, res) => {
    db.Article.find({})
        .populate('Note')
        .then((dbArticle) => {
            res.json(dbArticle)
        })
        .catch((err) => {
            res.json(err)
        })
})

// Get all saved articles//
router.get('/saved', (req, res) => {
    db.Article.find({ saved: true })
        .then((dbArticle) => {
            res.render('saved-articles', { article: dbArticle })
        })
        .catch((err) => {
            res.json(err)
        })
})

// Route for saving an article//
router.get('/saved/:id', (req, res) => {
    db.Article.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((dbArticle) => {
            hbObj = { article: dbArticle }
            res.render('saved-articles', hbObj)
        })
        .catch((err) => {
            res.json(err)
        })
})


// Route to get 1 article by it's id //
router.get('/articles/:id', (req, res) => {
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
router.post('/articles/:id', (req, res) => {
    req.body.article_id = req.params.id
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


module.exports = router