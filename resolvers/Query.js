function test() {
	return "Server is working!"
}

async function currentUser(parent, args, context) {
	const { userId } = context
	const user = await context.models.user.findById(userId)
	return user
}

async function games(parent, args, context) {
	const allGames = context.models.game.find()
	return allGames
}

async function gameSessions(parent, args, context) {
	const allSessions = await context
		.models
		.gameSession
		.find()
		.populate("game")
		.populate("players")
		.populate("winner")
	return allSessions
}

module.exports = {
	test,
	currentUser,
	games,
	gameSessions,
}