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

module.exports = {
	test,
	currentUser,
	games,
}