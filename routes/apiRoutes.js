const db = require('../models')
const express = require('express')

const router = express.Router()

// Get all articles from database //
router.get('/articles', (req, res) => {
    db.Article.find({})
        .then((dbArticle) => {
            res.json(dbArticle)
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