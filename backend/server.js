const express = require('express')
const app = express()
const dotenv = require('dotenv')
const signupUrls = require('./signup.route')
const cors = require('cors')
const flash = require("connect-flash")

dotenv.config()

app.get("")

app.use(flash())
app.use(express.json())
app.use(cors())
app.use('/', signupUrls)
app.listen(4000, () => console.log("Server Is Listening On Port 4000..."))
