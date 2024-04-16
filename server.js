const express = require('express')
const logger = require('morgan')
const multer = require('multer')
const passport = require('passport')
const upload = multer()

const app = express()

app.use(logger('dev'))
app.use(express.urlencoded()) //for xxx-format req
app.use(express.json ()) //for json req
app.use(upload.any())   //for form-data req
app.use(express.static(__dirname + "/public"))

app.use(passport.initialize());

require('./app/auth/passport')

// app.get('/' , (req, res) => {
//     res.send('ok')
// })

// app.post("/api", (req, res) =>{
//     console.log("req.body=", req.body)
//     console.log("req.headers.authorization=", req.headers.authorization) 
//     console.log ("req.query=", req.query)
//     console.log ("req.params=", req.params)
    
//     res.status(200).send("POST /api works");
// })

app.use(require('./app/auth/routes'))
app.use(require('./app/region/routes'))
app.use(require('./app/skills/routes'))
app.use(require('./app/employment-type/routes'))
app.use(require('./app/languages/routes'))
app.use(require('./app/resume/routes'))
app.use(require('./app/specializations/routes'))
app.use(require('./app/vacancy/routes'))
app.use(require('./app/applies/routes'))
app.use(require('./app/chat/routes'))


const PORT = 4000
app.listen(PORT , () => {
    console.log(`Server listening on Port ${PORT}`);
})