const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: String,
    content: String,
    version: Number
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
