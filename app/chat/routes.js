const express = require('express')
const router = express.Router();
const { getJobRecommendations, calculateMatchScore } = require('./controllers')
const passport = require('passport');
const { isUser } = require('../auth/middlewares');


router.post('/api/chat/suitable', passport.authenticate('jwt', { session: false }), isUser,  getJobRecommendations)
router.post('/api/chat/coincidences', passport.authenticate('jwt', { session: false }), isUser,  calculateMatchScore)

module.exports = router;