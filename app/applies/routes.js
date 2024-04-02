const express = require('express')
const router = express.Router();
const { createApply, getUserApplies, deleteApply, acceptUser, declineUser, getVacancyApplies } = require('./controllers')
const passport = require('passport');
const { isUser, isManager } = require('../auth/middlewares');
const { validateApply, isAuthorOfApply, isApplyExists } = require('./middlewares')
const { isAuthorOfVacancy } = require('../vacancy/middlewares');
const { getVacancy } = require('../vacancy/controllers');


router.post('/api/applies', passport.authenticate('jwt', { session: false }), isUser, validateApply, createApply)
router.get('/api/applies/User', passport.authenticate('jwt', { session: false }), isUser, getUserApplies)
router.delete('/api/applies/:id', passport.authenticate('jwt', { session: false }), isUser, isAuthorOfApply, deleteApply)
router.put('/api/applies/accept/user', passport.authenticate('jwt', { session: false }), isManager, isApplyExists, isAuthorOfVacancy, acceptUser)
router.put('/api/applies/decline/user', passport.authenticate('jwt', { session: false }), isManager, isApplyExists, isAuthorOfVacancy, declineUser)
router.get('/api/applies/vacancy/:id', passport.authenticate('jwt', { session: false }), isManager, isAuthorOfVacancy, getVacancyApplies)


module.exports = router;