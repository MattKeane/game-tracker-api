// import models
const User = require("../models/user")

function test() {
	return "Server is working!"
}

async function currentUser(parent, args, context) {
	const { userId } = context
	const user = await User.findById(userId)
	return user
}

module.exports = {
	test,
	currentUser
}