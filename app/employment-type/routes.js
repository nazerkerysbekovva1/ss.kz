const express = require('express')
const router = express.Router();
const {getEmploymentTypes, getEmploymentTypesByPost} = require('./controllers')

router.get('/api/employment-types', getEmploymentTypes)

// router.get('/api/resume/:id/employment-types', getEmploymentTypesByPost)


module.exports = router;