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


router.post('/contact-us', async (request, response) => {
	
	let transporter = nodemailer.createTransport({
		service: 'gmail', auth: {user: 'organize.graduation.project@gmail.com', pass: 'organize741236985'}
	})
	
	let mailOptions = {
		from: request.body.email,
		to: 'organize.graduation.project@gmail.com',
		subject: 'Contact Us Message',
		html: `
			<b>From:   </b> <i>${request.body.email}  </i>
			<br>
			<b>Message:</b> <i>${request.body.message}</i>
		`
	}
	
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error)
			response.json(1)
		} else {
			console.log('Email sent: ' + info.response)
			response.json(0)
		}
	})
})


router.post("/loginAuth", async (req, res) => {
	const {password, email} = req.body
	try {
		const account = await usersModel.template.findOne({email})
		if (!account) {
			return res.status(404).json({message: "User does not exist"})
		}
		const isPasswordCorrect = await bcrypt.compare(password, account.password)
		if (!isPasswordCorrect) {
			return res.status(400).json({message: "Invalid password"})
		}
		const token = jwt.sign({email, id: account._id}, "verysecret", {
			expiresIn: "12h"
		})
		console.log(token, email)
		const {accountPassword, ...userData} = account._doc
		res.status(201).json({token, userData})
	} catch (error) {
		console.log(error)
	}
})

router.post("/getName", async (req, res) => {
	try {
		const decodedData = jwt.verify(req.body.token, "verysecret")
		const user = await usersModel.template.findOne({email: decodedData.email})
		res.status(200).json({email: user.email})
		console.log(user.email)
	} catch (err) {
		console.log(err)
	}
})

router.post("/getAccountData", async (req, res) => {
	try {
		const decodedData = jwt.verify(req.body.token, "verysecret")
		const account = await usersModel.template.findOne({email: decodedData.email})
		res.json(account._doc)
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
