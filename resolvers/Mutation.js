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

async function login(parent, args, context) {
	const user = await context.models.user.findOne({ email: args.email })
	if (!user) {
		throw new Error("Invalid email or password")
	}

	const valid = await bcrypt.compare(args.password, user.password)
	if (!valid) {
		throw new Error("Invalid email or password")
	} else {
		const token = jwt.sign({ userId: user.id }, APP_SECRET)

		return {
			token,
			user
		}
	}
}

async function addGame(parent, args, context) {
	const createdGame = await context.models.game.create(args)
	return createdGame
}

module.exports = {
	signUp,
	login,
	addGame,
}