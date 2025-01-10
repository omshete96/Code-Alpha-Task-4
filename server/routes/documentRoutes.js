const express = require('express');
const Document = require('../models/Document');

const router = express.Router();

// Get a document by ID
router.get('/:id', async (req, res) => {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).send('Document not found');
    res.send(document);
});

// Create a new document
router.post('/', async (req, res) => {
    const newDocument = new Document({
        title: req.body.title,
        content: req.body.content,
        version: 1
    });

    await newDocument.save();
    res.send(newDocument);
});

// Update document content
router.put('/:id', async (req, res) => {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).send('Document not found');
    
    document.content = req.body.content;
    document.version += 1;

    await document.save();
    res.send(document);
});

module.exports = router;
