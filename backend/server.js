const express = require('express')
const app = express()
const dotenv = require('dotenv')
const signupUrls = require('./signup.route')
const cors = require('cors')
const flash = require("connect-flash")

let server = require('http').Server(app)
let io = require('socket.io')(server)
let stream = require('./meeting/ws/stream')
let path = require('path')

dotenv.config()

app.get("")

app.use(flash())
app.use(express.json())
app.use(cors())
app.use('/', signupUrls)

app.use('/assets', express.static(path.join(__dirname, '/meeting/assets')))
io.of('/stream').on('connection', stream)
app.get("/", (req, res) => res.sendFile(__dirname + "/meeting/meeting.html")
)

server.listen(4000, () => console.log("Server Is Listening On Port 4000..."))
