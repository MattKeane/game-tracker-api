const mongoose = require("mongoose")

const gameSchema = {
	title: {
		type: String,
		required: true
	},
	minPlayers: {
		type: Number,
		required: true
	},
	maxPlayers: {
		type: Number,
		required: true
	}
}

const game = mongoose.model("Game", gameSchema)

module.exports = game