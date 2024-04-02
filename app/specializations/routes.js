const express = require('express')
const router = express.Router();
const { getSpecializations } = require('./controllers')

router.get('/api/specialization', getSpecializations)

module.exports = router;