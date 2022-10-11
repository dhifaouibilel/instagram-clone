const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: String,
    user: String,
    image: String,
    comments: []
})

module.exports = mongoose.model('Post', postSchema);