const express = require('express')
const router = express.Router();
const {sendVerificationEmail , verifyCode, signUp, logIn, logout, getUserByEmail} = require('./controllers')
const { validateSignUp } = require('./middlewares')
const { upload } = require('./utils')

router.post('/api/auth/sendmail', sendVerificationEmail)
router.post('/api/auth/verifycode', verifyCode)

router.post('/api/auth/signup', validateSignUp, signUp)
router.post('/api/auth/login', logIn)

router.get('/api/auth/logout', logout)

router.get('/api/user/:email', getUserByEmail);

module.exports = router;