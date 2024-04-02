const express = require('express')
const router = express.Router();
const { createResume, getMyResumes, getResume, deleteResume, editResume, getworkingHistory, getworkingHistoryPost, searchResume } = require('./controllers');
const { isUser } = require('../auth/middlewares');
const passport = require('passport');
const { validateResume, isAuthorOfResume } = require('./middlewares');


router.post('/api/resume', passport.authenticate('jwt', { session: false }), isUser, validateResume, createResume)
router.get('/api/resume', passport.authenticate('jwt', { session: false }), isUser, getMyResumes)
router.get('/api/resume/search',  searchResume)
router.get('/api/resume/:id', passport.authenticate('jwt', { session: false }), getResume)
router.delete('/api/resume/:id', passport.authenticate('jwt', { session: false }), isUser, isAuthorOfResume, deleteResume)
router.put('/api/resume', passport.authenticate('jwt', { session: false }), isUser, isAuthorOfResume, validateResume, editResume)
router.get('/api/workingHistory/:id',  getworkingHistory)
router.get('/api/resume/:id/workingHistory',  getworkingHistoryPost)



module.exports = router;