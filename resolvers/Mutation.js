const User = require("../models/user")
const bcrypt = require("bcryptjs")

async function signUp(parent, args) {
	const password = await bcrypt.hash(args.password, 10)
	const userToCreate = { ...args, password }
	const createdUser = await User.create(userToCreate)
	return createdUser
}

module.exports = {
	signUp,
}