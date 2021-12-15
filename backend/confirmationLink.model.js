const mongoose = require('mongoose')

const confirmLinkTemplate = new mongoose.Schema({
	id: {
		type: String, required: true, unique: true
	}, token: {
		type: String, required: true
	}
})

const Link = mongoose.model('link', confirmLinkTemplate)

exports.createNewLink = (id, token) => {
	return new Promise((resolve, reject) => {
		mongoose.connect(process.env.DATABASE_ACCESS, {
			useNewUrlParser: true, useUnifiedTopology: true
		}).then(() => {
			let link = new Link({id: id, token: token})
			return link.save()
		}).then(() => {
			resolve()
		}).catch(err => {
			reject(err)
		})
	})
}

exports.checkLink = (id, token) => {
	
	return new Promise((resolve, reject) => {
		mongoose.connect(process.env.DATABASE_ACCESS, {
			useNewUrlParser: true, useUnifiedTopology: true
		}).then(() => {
			return Link.findOne({id: id})
		}).then(link => {
			if (token == link.token) {
				resolve("link Matched")
			} else {
				console.log("Error link")
			}
		}).catch(err => reject(err))
	})
	
}

exports.deleteConfirmLink = (id) => {
	return new Promise((resolve, reject) => {
		mongoose.connect(process.env.DATABASE_ACCESS, {
			useNewUrlParser: true, useUnifiedTopology: true
		}).then(() => {
			return Link.deleteOne({id: id})
		}).then(() => {
			resolve("Successfully Deleted")
		}).catch(err => {
			reject(err)
		})
	})
	
}
