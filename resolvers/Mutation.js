const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { APP_SECRET, getUserId } = require("../utils")

async function signUp(parent, args, context) {
	const password = await bcrypt.hash(args.password, 10)
	const userToCreate = { ...args, password }
	const createdUser = await context.models.user.create(userToCreate)
	const token = jwt.sign({ userId: createdUser.id }, APP_SECRET)
	return {
		token,
		user: createdUser
	}
}

module.exports = {
	signUp,
}