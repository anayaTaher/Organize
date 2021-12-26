const express = require('express')
const app = express()
const dotenv = require('dotenv')
const signupUrls = require('./signup.route')
const projectRoutes = require("./project.route")
const contributorRouters = require("./contributor.route")
const teamRouters = require("./teams.route")
const cors = require('cors')
const flash = require("connect-flash")
const taskRoutes = require("./task.routes")

let server = require('http').Server(app)
let io = require('socket.io')(server)
let stream = require('./meeting/ws/stream')
let path = require('path')
const mongoose = require("mongoose")

dotenv.config()

mongoose.connect(
	process.env.DATABASE_ACCESS,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => console.log("Database Successfully Connected")
);

app.get("")

app.use(flash())
app.use(express.json())
app.use(cors())
app.use('/', signupUrls)
app.use("/", projectRoutes)
app.use("/", contributorRouters)
app.use("/", teamRouters)
app.use("/", taskRoutes)

app.use('/assets', express.static(path.join(__dirname, '/meeting/assets')))
io.of('/stream').on('connection', stream)
app.get("/", (req, res) => res.sendFile(__dirname + "/meeting/meeting.html"))

server.listen(4000, () => console.log("Server Is Listening On Port 4000..."))
