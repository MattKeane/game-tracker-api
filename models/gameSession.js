const mongoose = require("mongoose")

const gameSessionSchema = {
	game: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Game"
	},
	players: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	date: {
		type: Date,
		default: Date.now
	},
	winner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	notes: String
}

const gameSession = mongoose.model("GameSession", gameSessionSchema)
module.exports = gameSession