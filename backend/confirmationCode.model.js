const mongoose = require('mongoose')

const confirmCodeTemplate = new mongoose.Schema({
	email: {
		type: String, required: true
	}, confirmCode: {
		type: String, required: true
	}
})

const Confirm = mongoose.model('code', confirmCodeTemplate)

exports.createNewConfirm = (email) => {
	let confirmCode
	return new Promise((resolve, reject) => {
		mongoose.connect(process.env.DATABASE_ACCESS, {
			useNewUrlParser: true, useUnifiedTopology: true
		}).then(() => {
			confirmCode = Math.floor(100000 + Math.random() * 900000)
			let confirm = new Confirm({email: email, confirmCode: confirmCode})
			return confirm.save()
		}).then(() => {
			resolve(confirmCode)
		}).catch(err => {
			reject(err)
		})
	})
}

exports.checkConfirm = (data) => {
	return new Promise((resolve, reject) => {
		mongoose.connect(process.env.DATABASE_ACCESS, {
			useNewUrlParser: true, useUnifiedTopology: true
		}).then(() => {
			return Confirm.findOne({email: data.email})
		}).then(code => {
			if (code) {
				if (code.confirmCode === data.code) {
					resolve("Code Matched")
				} else {
					reject("Error Code")
				}
			} else {
				reject("Error Email")
			}
		}).catch(err => {
			reject(err)
		})
	})
	
}

exports.deleteConfirmCode = (data) => {
	return new Promise((resolve, reject) => {
		mongoose.connect(process.env.DATABASE_ACCESS, {
			useNewUrlParser: true, useUnifiedTopology: true
		}).then(() => {
			return Confirm.deleteMany({email: data.email})
		}).then(() => {
			resolve("Successfully Deleted")
		}).catch(err => {
			reject(err)
		})
	})
	
}
