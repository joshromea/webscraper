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
    }
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article