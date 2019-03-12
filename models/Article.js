const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    link: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    saved: {
        type: Boolean,
        default: false
    }
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article