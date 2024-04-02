const express = require('express')
const router = express.Router();

router.get('/api/languages', (req, res) => res.status(200).send(['Англлийский', 'Русский', 'Казахский']))

module.exports = router;