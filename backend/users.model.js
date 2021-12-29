const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const userTemplate = new mongoose.Schema({
	firstName: {
		type: String, required: true
	}, lastName: {
		type: String, required: true
	}, username: {
		type: String, required: true
	}, email: {
		type: String, required: true, unique: true
	}, password: {
		type: String, required: true
	}, date: {
		type: Date, default: Date.now
	}, isOnline: {
		type: Boolean, default: true
	},
	image: {
		type: String, default: ""
	}
})

const User = mongoose.model('user', userTemplate)

exports.createNewUser = (data) => {
	
	return new Promise((resolve, reject) => {
		mongoose.connect(process.env.DATABASE_ACCESS, {
			useNewUrlParser: true, useUnifiedTopology: true
		}).then(() => {
			return User.findOne({email: data.email})
		}).then(user => {
			if (user) {
				reject("The email address is already being used.")
			} else {
				return bcrypt.hash(data.password, 10)
			}
		}).then(hashedPassword => {
			let user = new User({
				firstName: data.firstName,
				lastName: data.lastName,
				username: data.username,
				email: data.email,
				password: hashedPassword
			})
			return user.save()
		}).then(() => {
			resolve()
		}).catch(err => {
			reject(err)
		})
	})
	
}

exports.checkIfUserIsExist = (email) => {
	
	return new Promise((resolve, reject) => {
		mongoose.connect(process.env.DATABASE_ACCESS, {
			useNewUrlParser: true, useUnifiedTopology: true
		}).then(() => {
			return User.findOne({email: email})
		}).then(user => {
			if (user) {
				reject(user)
			} else {
				resolve("The email address is not used.")
			}
		}).catch(err => {
			reject(err)
		})
	})
	
}

exports.changePassword = (id, password) => {
	
	return new Promise((resolve, reject) => {
		mongoose.connect(process.env.DATABASE_ACCESS, {
			useNewUrlParser: true, useUnifiedTopology: true
		}).then(() => {
			return User.findOne({_id: id})
		}).then(user => {
			if (user) {
				user.updateOne({password: password})
					.then(() => console.log("Successfully Updated"))
					.catch(() => console.log("\"Successfully Updated\""))
				resolve("")
			} else {
				reject("No User")
			}
		}).catch(err => {
			reject(err)
		})
	})
	
}

let displayName

exports.checkUserAndEmail = (data) => {
	return new Promise((resolve, reject) => {
		mongoose.connect(process.env.DATABASE_ACCESS, {useNewUrlParser: true, useUnifiedTopology: true})
			.then(() => User.findOne({email: data.email}))
			.then(user => {
				if (!user) {
					reject(0) // There is no user matches this email
				} else {
					displayName = user.firstName + " " + user.lastName
					return bcrypt.compare(data.password, user.password)
				}
			})
			.then(same => {
				if (!same) {
					reject(1) // password is incorrect
				} else {
					reject(displayName) // correct email and password
				}
			})
			.catch(err => {
				reject(err)
			})
	})
}

exports.template = mongoose.model("user", userTemplate)
