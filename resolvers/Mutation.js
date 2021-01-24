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

async function addGameSession(parent, args, context) {
	const winner = await context.models.user.findById(args.winner)
	const players = []
	for (const player of args.players) {
		const playerToAdd = await context.models.user.findById(player)
		players.push(playerToAdd)
	}
	const game = await context.models.game.findById(args.game)
	const sessionToCreate = { ...args, winner, players, game }
	let createdSession = await context
		.models
		.gameSession
		.create(sessionToCreate)
	createdSession.populate("game")
		.populate("players")
		.populate("winner")
	return createdSession
}

module.exports = {
	signUp,
	login,
	addGameSession,
	addGame,
}