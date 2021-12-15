const express = require('express')
const router = express.Router()
const usersModel = require('./users.model')
const confirmCodeModel = require('./confirmationCode.model')
const confirmLinkModel = require('./confirmationLink.model')
const nodemailer = require('nodemailer')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
let userInfo = {}
let idToken = {}

router.post('/login', async (request, response) => {
	usersModel.checkUserAndEmail(request.body).then(res => response.json(res)).catch(err => response.json(err))
})

router.post('/signup', async (request, response) => {
	
	if (request.body.flag == 0) {
		userInfo = request.body
		usersModel.checkIfUserIsExist(request.body.email).then(() => {
			confirmCodeModel.createNewConfirm(request.body.email).then(res => {
				let transporter = nodemailer.createTransport({
					service: 'gmail', auth: {user: 'organize.graduation.project@gmail.com', pass: 'organize741236985'}
				})
				
				let mailOptions = {
					from: 'organize.graduation.project@gmail.com',
					to: request.body.email,
					subject: 'Confirmation Code',
					html: `Hello ${request.body.firstName}, Please enter this confirmation code <b>${res}</b> in the window where you started creating your account.`
				}
				
				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log(error)
					} else {
						console.log('Email sent: ' + info.response)
					}
				})
			}).catch()
			response.json(1)
		}).catch(() => response.json(0))
	} else if (request.body.flag == 1) {
		confirmCodeModel.checkConfirm(request.body).then(() => {
			usersModel.createNewUser(userInfo).then().catch()
			response.json(1)
		}).catch(() => {
			response.json(0)
		})
	} else if (request.body.flag == 2) {
		confirmCodeModel.deleteConfirmCode(request.body).then().catch()
	}
})

router.post('/forgotPassword', async (request, response) => {
	usersModel.checkIfUserIsExist(request.body.email).then(() => response.json(0)).catch(user => {
		const JWT_Secret = "Some Super Secret..."
		const secret = JWT_Secret + user.password
		const payload = {email: user.email, id: user._id}
		const token = jwt.sign(payload, secret, {expiresIn: "15m"})
		const link = `http://localhost:3000/reset-password/${user._id}/${token}`
		confirmLinkModel.createNewLink(user._id, token)
		
		let transporter = nodemailer.createTransport({
			service: 'gmail', auth: {user: 'organize.graduation.project@gmail.com', pass: 'organize741236985'}
		})
		
		let mailOptions = {
			from: 'organize.graduation.project@gmail.com',
			to: request.body.email,
			subject: 'Link Code',
			html: `Hello, Click on this link to reset your password <b><br></bt>${link}<br></b>`
		}
		
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error)
			} else {
				console.log('Email sent: ' + info.response)
			}
		})
		
		response.json(1)
	})
	
})
router.post('/reset-password/:id/:token', async (request, response) => {
	
	if (request.body.flag == 0) {
		
		const {id, token} = request.body
		idToken = {id, token}
		confirmLinkModel.checkLink(id, token).then(() => response.json(1)).catch(() => response.json(0))
		
	} else {
		bcrypt.hash(request.body.password, 10).then(pass => {
			usersModel.changePassword(idToken.id, pass).then(() => response.json(1))
			confirmLinkModel.deleteConfirmLink(idToken.id)
		})
	}
})


module.exports = router
