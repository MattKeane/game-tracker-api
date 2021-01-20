function test() {
	return "Server is working!"
}

async function currentUser(parent, args, context) {
	const { userId } = context
	const user = await context.models.user.findById(userId)
	return user
}

module.exports = {
	test,
	currentUser
}