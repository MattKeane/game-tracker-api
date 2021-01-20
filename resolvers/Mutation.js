const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { APP_SECRET, getUserId } = require("../utils")

// importing models
const User = require("../models/user")

async function signUp(parent, args) {
	const password = await bcrypt.hash(args.password, 10)
	const userToCreate = { ...args, password }
	const createdUser = await User.create(userToCreate)
	const token = jwt.sign({ userId: createdUser.id }, APP_SECRET)
	return {
		token,
		user: createdUser
	}
}

module.exports = {
	signUp,
}